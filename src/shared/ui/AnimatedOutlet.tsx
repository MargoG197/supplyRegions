// // src/shared/ui/AnimatedOutlet.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigationType, useOutlet } from 'react-router-dom';

// const DURATION = 350;
// const EASE_IN  = 'cubic-bezier(0.16, 1, 0.3, 1)';
// const EASE_OUT = 'ease-in';

// type Phase = 'idle' | 'in' | 'out';

// export const AnimatedOutlet = () => {
//   const location = useLocation();
//   const outlet = useOutlet();
//   const navType = useNavigationType();

//   // Нижний слой: стоит на месте (старый при "вперёд", главная при "назад")
//   const [under, setUnder] = useState<React.ReactNode | null>(null);

//   // Верхний слой: анимируется
//   const [top, setTop] = useState<React.ReactNode>(outlet);

//   // Фаза анимации верхнего слоя
//   const [phase, setPhase] = useState<Phase>('idle');

//   const prevPath = useRef(location.pathname);
//   const timer = useRef<number | null>(null);

//   useEffect(() => {
//     // Тот же путь — просто обновляем контент (например, изменились данные)
//     if (prevPath.current === location.pathname) {
//       setTop(outlet);
//       return;
//     }

//     const isBack = navType === 'POP';
//     prevPath.current = location.pathname;

//     if (timer.current) window.clearTimeout(timer.current);

//     if (isBack) {
//       // НАЗАД: главная кладётся под низ СРАЗУ, текущая (верхняя) уезжает вправо
//       setTimeout(()=>setUnder(outlet), 0);   // куда возвращаемся — под низ
//       setTimeout(()=>setPhase('out'),0);    // верхняя уезжает вправо (слева направо)
//       // top НЕ трогаем — там ещё старый экран, он и уезжает

//       timer.current = window.setTimeout(() => {
//         setTop(outlet);   // после уезда верхний слой = главная
//         setUnder(null);   // нижний больше не нужен
//         setPhase('idle');
//       }, DURATION);
//     } else {
//       // ВПЕРЁД: старый под низ, новый верхний выезжает справа налево
//       setUnder(top);      // старый экран — под низ
//       setTop(outlet);     // новый экран — наверх
//       setPhase('in');     // выезжает справа налево

//       timer.current = window.setTimeout(() => {
//         setUnder(null);
//         setPhase('idle');
//       }, DURATION);
//     }

//     return () => {
//       if (timer.current) window.clearTimeout(timer.current);
//     };
//   }, [location.pathname, outlet, navType, top]);

//   // Анимации
//   const inAnimation = `slide-in-right ${DURATION}ms ${EASE_IN} forwards`;
//   // Выезд справа налево = slide-in-right
//   // Задвижение слева направо (уезд вправо) = slide-out-right
//   const outAnimation = `slide-out-right ${DURATION}ms ${EASE_OUT} forwards`;

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Нижний слой — стоит */}
//       {under && (
//         <div className="absolute inset-0">{under}</div>
//       )}

//       {/* Верхний слой — анимируется */}
//       <div
//         className="relative w-full h-full"
//         style={{
//           animation:
//             phase === 'in'
//               ? inAnimation
//               : phase === 'out'
//                 ? outAnimation
//                 : undefined,
//         }}
//       >
//         {top}
//       </div>
//     </div>
//   );
// };


// src/shared/ui/AnimatedOutlet.tsx
import React, { useEffect, useReducer, useRef } from 'react';
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom';

const DURATION = 350;
const EASE_IN  = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_OUT = 'ease-in';

type Phase = 'idle' | 'in' | 'out';

interface State {
  under: React.ReactNode | null;
  top: React.ReactNode;
  phase: Phase;
}

type Action =
  | { type: 'reset'; outlet: React.ReactNode }
  | { type: 'forward'; oldTop: React.ReactNode; outlet: React.ReactNode }
  | { type: 'back'; outlet: React.ReactNode }
  | { type: 'finish-forward' }
  | { type: 'finish-back'; outlet: React.ReactNode };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return { under: null, top: action.outlet, phase: 'idle' };
    case 'forward':
      return { under: action.oldTop, top: action.outlet, phase: 'in' };
    case 'back':
      return { under: action.outlet, top: state.top, phase: 'out' };
    case 'finish-forward':
      return { under: null, top: state.top, phase: 'idle' };
    case 'finish-back':
      return { under: null, top: action.outlet, phase: 'idle' };
  }
}

export const AnimatedOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const navType = useNavigationType();

  const [state, dispatch] = useReducer(reducer, { under: null, top: outlet, phase: 'idle' });

  const prevPath = useRef(location.pathname);
  const timer = useRef<number | null>(null);
  const topRef = useRef(state.top);

  // обновляем topRef без setState — просто ref
  useEffect(() => { topRef.current = state.top; }, [state.top]);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      // тот же путь — просто обновляем контент (данные могли измениться)
      dispatch({ type: 'reset', outlet });
      return;
    }

    const isBack = navType === 'POP';
    prevPath.current = location.pathname;

    if (timer.current) window.clearTimeout(timer.current);

    if (isBack) {
      dispatch({ type: 'back', outlet });
      timer.current = window.setTimeout(() => {
        dispatch({ type: 'finish-back', outlet });
      }, DURATION);
    } else {
      dispatch({ type: 'forward', oldTop: topRef.current, outlet });
      timer.current = window.setTimeout(() => {
        dispatch({ type: 'finish-forward' });
      }, DURATION);
    }

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [location.pathname, outlet, navType]);

  const inAnimation  = `slide-in-right ${DURATION}ms ${EASE_IN} forwards`;
  const outAnimation = `slide-out-right ${DURATION}ms ${EASE_OUT} forwards`;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {state.under && <div className="absolute inset-0">{state.under}</div>}
      <div
        className="relative w-full h-full"
        style={{
          animation:
            state.phase === 'in'
              ? inAnimation
              : state.phase === 'out'
                ? outAnimation
                : undefined,
        }}
      >
        {state.top}
      </div>
    </div>
  );
};