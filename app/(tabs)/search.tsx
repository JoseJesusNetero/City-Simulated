import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { STORES } from '@/src/data/mockData';
import { StoreCard } from '@/src/components/StoreCard';
import { colors } from '@/src/theme/colors';

/** Buscar tab — text search with open / promo filters. */
export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const data = STORES.filter(s =>
    `${s.name} ${s.category}`.toLowerCase().includes(query.toLowerCase()) &&
    (!onlyOpen || s.isOpen) && (!onlyPromo || s.hasPromotion));
  const Chip = ({ label, on, toggle }: { label: string; on: boolean; toggle: () => void }) => (
    <Pressable onPress={toggle} style={[styles.chip, on && styles.chipOn]}><Text style={[styles.chipText, on && { color: colors.background }]}>{label}</Text></Pressable>
  );
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
        <View style={styles.box}>
          <Search size={18} color={colors.textMuted} />
          <TextInput accessibilityLabel="Buscar estabelecimentos" value={query} onChangeText={setQuery} placeholder="Nome ou categoria…" placeholderTextColor={colors.textMuted} style={styles.input} />
        </View>
        <View style={styles.chips}>
          <Chip label="ABERTAS" on={onlyOpen} toggle={() => setOnlyOpen(!onlyOpen)} />
          <Chip label="COM PROMOÇÃO" on={onlyPromo} toggle={() => setOnlyPromo(!onlyPromo)} />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <StoreCard item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma loja encontrada. Tente outra busca.</Text>}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', letterSpacing: 1 },
  box: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 14, height: 48 },
  input: { flex: 1, color: colors.text, fontSize: 14, height: 46, outlineWidth: 0 } as any,
  chips: { flexDirection: 'row', gap: 8, marginTop: 12 },
  chip: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 6 },
  chipOn: { backgroundColor: colors.neonBlue, borderColor: colors.neonBlue },
  chipText: { color: colors.neonBlue, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  empty: { color: colors.textMuted, padding: 20 },
});
