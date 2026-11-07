import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STORES } from '@/src/data/mockData';
import { StoreCard } from '@/src/components/StoreCard';
import { colors } from '@/src/theme/colors';

/** Explorar tab — clean vertical list of every store. */
export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <Text style={styles.subtitle}>Lojas e promoções perto de você</Text>
      </View>
      <FlatList
        data={STORES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard item={item} />}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: colors.neonBlue, fontSize: 13, marginTop: 4 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
});
