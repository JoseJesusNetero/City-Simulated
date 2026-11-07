import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Store } from '@/src/data/mockData';
import { StatusDot } from '@/src/components/StatusDot';
import { colors, radii } from '@/src/theme/colors';

/** Result card with an internally zoomed photo, status and discount tag. */
export function StoreCard({ item }: { item: Store }) {
  return (
    <Pressable
      onPress={() => router.push(`/store/${item.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.isOpen ? 'aberto' : 'fechado'}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.thumb}>
        <Image source={item.mapImageUrl} contentFit="cover" style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.45 }] }]} />
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <StatusDot isOpen={item.isOpen} />
        {item.promotion && <Text style={styles.promoText} numberOfLines={1}>{item.promotion.description}</Text>}
      </View>
      {item.promotion && (
        <View style={styles.badge}><Text style={styles.badgeText}>{item.promotion.discount}</Text></View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, padding: 12 },
  pressed: { borderColor: colors.neonBlue, backgroundColor: colors.surfaceAlt },
  thumb: { width: 104, height: 104, borderRadius: radii.md, overflow: 'hidden', backgroundColor: colors.surfaceAlt },
  info: { flex: 1, marginLeft: 14, gap: 4, paddingTop: 14 },
  category: { color: colors.neonPink, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  name: { color: colors.text, fontSize: 17, fontWeight: '800' },
  promoText: { color: colors.neonYellow, fontSize: 12, fontWeight: '600', marginTop: 2 },
  badge: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 8, height: 22, borderRadius: 11, backgroundColor: colors.neonPink, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.text, fontSize: 12, fontWeight: '900' },
});
