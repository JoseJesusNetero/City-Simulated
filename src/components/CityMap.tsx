import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { STORES, Store } from '@/src/data/mockData';
import { colors } from '@/src/theme/colors';

export const MAP_URL = 'https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793162362739-city-map.jpg';

export function CityMap({ width, onSelect, selectedId }: { width: number; onSelect: (store: Store) => void; selectedId?: string }) {
  const scale = width / 1230;
  const height = 819 * scale;
  return <View style={{ width, height }}>
    <Image source={MAP_URL} style={StyleSheet.absoluteFill} contentFit="fill" />
    {STORES.filter(store => store.isOpen).map(store => {
      const b = store.building;
      return <View key={store.id} pointerEvents="none" style={[
        styles.crop,
        { left: b.x * scale, top: b.y * scale, width: b.w * scale, height: b.h * scale },
        Platform.OS === 'web' ? ({ filter: 'brightness(1.615) sepia(1) saturate(8) hue-rotate(85deg)', boxShadow: '0 0 14px #00d9745f' } as any) : { shadowColor: colors.neonGreen, shadowOpacity: 0.68, shadowRadius: 10.2 },
      ]}>
        <Image source={MAP_URL} contentFit="fill" style={{ position: 'absolute', width, height, left: -b.x * scale, top: -b.y * scale }} />
        {Platform.OS !== 'web' && <View style={[StyleSheet.absoluteFill, { backgroundColor: '#00d97451' }]} />}
      </View>;
    })}
    {STORES.map(store => {
      const b = store.building;
      const x = width * store.x / 100;
      const y = height * store.y / 100;
      const statusColor = store.isOpen ? colors.neonGreen : colors.neonRed;
      // Character stands on the street right in front of the house, sized to the house.
      const size = Math.max(34, b.w * scale * 1.15);
      const charLeft = (b.x + b.w / 2) * scale - size / 2;
      const charTop = (b.y + b.h) * scale + 3;
      const selected = selectedId === store.id;
      return <React.Fragment key={store.id}>
        <Pressable onPress={() => onSelect(store)} accessibilityRole="button" accessibilityLabel={`${store.name}, ${store.isOpen ? 'aberto' : 'fechado'}`} style={[styles.statusPin, { left: x - 22, top: y - 28 }]}>
          <Svg width={22} height={26} viewBox="0 0 22 26">
            <Circle cx="11" cy="12" r="7" fill={statusColor} stroke={selected ? colors.neonYellow : colors.background} strokeWidth="2" />
          </Svg>
        </Pressable>
        <Pressable onPress={() => onSelect(store)} accessibilityRole="button" accessibilityLabel={`Ver ${store.name}`} style={{ position: 'absolute', left: charLeft, top: charTop, width: size, height: size, borderRadius: 4, overflow: 'hidden', borderWidth: 1.5, borderColor: selected ? colors.neonYellow : statusColor }}>
          <Image source={store.mapImageUrl} contentFit="cover" style={StyleSheet.absoluteFill} />
        </Pressable>
        {store.hasPromotion && <Pressable onPress={() => onSelect(store)} accessibilityRole="button" accessibilityLabel={`Promoção em ${store.name}`} hitSlop={8} style={[styles.promo, { left: charLeft + size + 1, top: charTop + size / 2 - 9 }]}>
          <Svg width={14} height={18} viewBox="0 0 40 48">
            <Path d="M20 45 C17 37 5 29 5 19 A15 15 0 1 1 35 19 C35 29 23 37 20 45Z" fill="#ec365b" stroke={selected ? colors.neonYellow : '#ff8499'} strokeWidth="2" />
            <SvgText x="20" y="25" textAnchor="middle" fontSize="19" fontWeight="bold" fill={colors.text}>%</SvgText>
          </Svg>
        </Pressable>}
      </React.Fragment>;
    })}
  </View>;
}
const styles = StyleSheet.create({
  crop: { position: 'absolute', overflow: 'hidden', borderRadius: 2 },
  statusPin: { position: 'absolute', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  promo: { position: 'absolute', width: 16, height: 20, alignItems: 'center', justifyContent: 'center' },
});
