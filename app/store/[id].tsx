import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CalendarCheck, Clock, Star, TicketPercent } from 'lucide-react-native';
import { STORES } from '@/src/data/mockData';
import { colors as c } from '@/src/theme/colors';

export default function StoreDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = STORES.find(s => s.id === id);
  const [showPromo, setShowPromo] = useState(false);
  const [reserved, setReserved] = useState(false);
  const back = () => router.canGoBack() ? router.back() : router.replace('/');
  if (!store) return <SafeAreaView style={s.root}><Text style={s.title}>Loja não encontrada</Text><Pressable onPress={back}><Text style={s.link}>Voltar ao mapa</Text></Pressable></SafeAreaView>;
  const statusColor = store.isOpen ? c.neonGreen : c.neonRed;
  return <SafeAreaView style={s.root}>
    <View style={s.header}>
      <Pressable accessibilityLabel="Voltar" onPress={back} style={s.back}><ArrowLeft color={c.neonBlue} size={22} /></Pressable>
      <Text style={s.headerText}>ESTABELECIMENTO</Text>
    </View>
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.hero}>
        <Image source={store.imageUrl} style={StyleSheet.absoluteFill} contentFit="fill" />
        <View style={s.status}><Text style={{ color: statusColor, fontWeight: '700', fontSize: 12 }}>● {store.isOpen ? 'Aberto agora' : 'Fechado'}</Text></View>
      </View>
      <Text style={s.category}>{store.category.toUpperCase()}</Text>
      <Text style={s.title}>{store.name}</Text>
      <Text style={s.body}>{store.description}</Text>

      <View style={s.section}>
        <View style={s.rowHead}><Clock size={18} color={c.neonBlue} /><Text style={s.label}>Horário de funcionamento</Text></View>
        <Text style={s.body}>{store.hours}</Text>
      </View>

      <View style={s.section}>
        <Text style={s.label}>Cardápio / Produtos</Text>
        {store.menu.map(m => (
          <View key={m.name} style={s.menuRow}><Text style={s.menuName}>{m.name}</Text><Text style={s.price}>{m.price}</Text></View>
        ))}
      </View>

      <View style={s.section}>
        <Text style={s.label}>Avaliações</Text>
        {store.reviews.map(r => (
          <View key={r.author} style={s.review}>
            <View style={s.reviewTop}>
              <Text style={s.menuName}>{r.author}</Text>
              <View style={{ flexDirection: 'row', gap: 2 }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} color={c.neonYellow} fill={i < r.rating ? c.neonYellow : 'transparent'} />)}</View>
            </View>
            <Text style={s.body}>{r.text}</Text>
          </View>
        ))}
      </View>

      {store.promotion && <>
        <Pressable style={s.promoButton} onPress={() => setShowPromo(!showPromo)}>
          <TicketPercent color={c.neonPink} size={20} /><Text style={s.promoButtonText}>{showPromo ? 'Ocultar promoção' : 'Ver promoção ativa'}</Text>
        </Pressable>
        {showPromo && <View style={s.promo}><Text style={s.promoLabel}>PROMOÇÃO ATIVA</Text><Text style={s.discount}>{store.promotion.discount}</Text><Text style={s.offer}>{store.promotion.description}</Text></View>}
      </>}

      <Pressable style={[s.button, !store.isOpen && { opacity: 0.85 }]} onPress={() => setReserved(true)}>
        <CalendarCheck color={c.background} size={20} />
        <Text style={s.buttonText}>{reserved ? 'Reserva solicitada!' : store.actionLabel}</Text>
      </Pressable>
    </ScrollView>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: c.background },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderBottomWidth: 1, borderBottomColor: c.border },
  back: { padding: 8 },
  headerText: { color: c.text, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  content: { padding: 24, width: '100%', maxWidth: 680, alignSelf: 'center', paddingBottom: 50 },
  hero: { height: 280, backgroundColor: c.surface, borderWidth: 1, borderColor: c.neonBlue, borderRadius: 12, overflow: 'hidden', marginBottom: 25 },
  status: { position: 'absolute', bottom: 14, left: 14, backgroundColor: c.background, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  category: { color: c.neonBlue, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { color: c.text, fontSize: 28, fontWeight: '900', marginTop: 10 },
  body: { color: c.textMuted, fontSize: 13, lineHeight: 22, marginTop: 8 },
  section: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: c.border },
  rowHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { color: c.text, fontSize: 14, fontWeight: '700' },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  menuName: { color: c.text, fontSize: 13 },
  price: { color: c.neonGreen, fontSize: 13, fontWeight: '700' },
  review: { marginTop: 12, padding: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, borderRadius: 8 },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: c.neonPink, padding: 15, borderRadius: 8, marginTop: 22 },
  promoButtonText: { color: c.neonPink, fontWeight: '800', fontSize: 14 },
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: c.neonGreen, padding: 17, borderRadius: 8, marginTop: 14 },
  buttonText: { color: c.background, fontWeight: '800', fontSize: 14 },
  promo: { padding: 22, marginTop: 14, backgroundColor: '#ffe69b', borderRadius: 10 },
  promoLabel: { color: '#48370d', fontWeight: '800', fontSize: 11, letterSpacing: 1 },
  discount: { color: c.background, fontSize: 42, fontWeight: '900', marginVertical: 8 },
  offer: { color: c.background, fontWeight: '700', fontSize: 17 },
  link: { color: c.neonBlue, padding: 20 },
});
