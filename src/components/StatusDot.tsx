import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/theme/colors';

interface StatusDotProps {
  isOpen: boolean;
}

/** Coloured dot + label showing whether a store is open or closed. */
export function StatusDot({ isOpen }: StatusDotProps) {
  const color = isOpen ? colors.neonGreen : colors.neonRed;
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: color, shadowColor: color }]} />
      <Text style={[styles.label, { color }]}>{isOpen ? 'Aberto' : 'Fechado'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOpacity: 0.765,
    shadowRadius: 3.4,
    shadowOffset: { width: 0, height: 0 },
  },
  label: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
});
