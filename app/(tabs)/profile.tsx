import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Compass, Crown, Settings } from 'lucide-react-native';
import { colors, radii } from '@/src/theme/colors';

const AVATAR_URL = 'https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793153021647-padeiro.png';

const BADGES = [
  { id: 'explorer', label: 'Explorer', color: colors.neonBlue, Icon: Compass },
  { id: 'vip', label: 'VIP', color: colors.neonPink, Icon: Crown },
];

/**
 * Perfil tab — user avatar, name and achievement badges.
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>Perfil</Text>
          <Settings color={colors.textMuted} size={20} />
        </View>

        <View style={styles.avatarRing}>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} contentFit="cover" />
        </View>

        <Text style={styles.name}>Ana Silva</Text>
        <Text style={styles.handle}>@ana.silva · Cidadã desde 2024</Text>

        <View style={styles.badgeRow}>
          {BADGES.map(({ id, label, color, Icon }) => (
            <View key={id} style={[styles.badge, { borderColor: color, shadowColor: color }]}>
              <Icon color={color} size={16} />
              <Text style={[styles.badgeText, { color }]}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsRow}>
          <Stat label="Check-ins" value="42" />
          <Stat label="Promos usadas" value="11" />
          <Stat label="Pontos" value="1.280" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  screenTitle: { color: colors.text, fontSize: 30, fontWeight: '900', letterSpacing: 1 },
  avatarRing: {
    padding: 4,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colors.neonGreen,
    shadowColor: colors.neonGreen,
    shadowOpacity: 0.8,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceAlt,
  },
  name: { color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 16 },
  handle: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  badgeRow: { flexDirection: 'row', gap: 12, marginTop: 18 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    backgroundColor: colors.surface,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  badgeText: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 32,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 18,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: colors.neonBlue, fontSize: 20, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4, letterSpacing: 0.5 },
});
