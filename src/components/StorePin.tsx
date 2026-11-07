import React from 'react';
import Svg, { Circle, Defs, G, Line, RadialGradient, Stop, Text as SvgText } from 'react-native-svg';
import { colors } from '@/src/theme/colors';

interface StorePinProps {
  isOpen: boolean;
  hasPromotion: boolean;
  size?: number;
  selected?: boolean;
}

/**
 * A neon store marker drawn with SVG.
 * - Green circle when the store is open, red when closed.
 * - If the store has a promotion, a red balloon with "%" floats above the pin.
 */
export function StorePin({ isOpen, hasPromotion, size = 44, selected = false }: StorePinProps) {
  const pinColor = isOpen ? colors.neonGreen : colors.neonRed;
  const r = selected ? 11 : 9;
  const cx = size / 2;
  const cy = size - r - 4;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id={`glow-${isOpen ? 'open' : 'closed'}`} cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={pinColor} stopOpacity="0.55" />
          <Stop offset="100%" stopColor={pinColor} stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Glow halo */}
      <Circle cx={cx} cy={cy} r={r + 7} fill={`url(#glow-${isOpen ? 'open' : 'closed'})`} />

      {/* Main pin */}
      <Circle cx={cx} cy={cy} r={r} fill={pinColor} stroke={colors.background} strokeWidth={2} />
      <Circle cx={cx} cy={cy} r={r / 2.2} fill={colors.background} opacity={0.35} />

      {/* Promotion balloon on top */}
      {hasPromotion && (
        <G>
          <Line
            x1={cx}
            y1={cy - r}
            x2={cx}
            y2={cy - r - 8}
            stroke={colors.neonPink}
            strokeWidth={1.5}
          />
          <Circle cx={cx} cy={cy - r - 14} r={8} fill={colors.neonPink} stroke={colors.text} strokeWidth={1} />
          <SvgText
            x={cx}
            y={cy - r - 10.5}
            fontSize={10}
            fontWeight="800"
            fill={colors.text}
            textAnchor="middle"
          >
            %
          </SvgText>
        </G>
      )}
    </Svg>
  );
}
