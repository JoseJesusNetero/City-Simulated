export interface Promotion { discount: string; description: string }
export interface Building { x: number; y: number; w: number; h: number }
export interface MenuItem { name: string; price: string }
export interface Review { author: string; rating: number; text: string }
export interface Store {
  id: string; name: string; category: string; isOpen: boolean;
  /** Percentage coordinates anchored to the source map. */
  x: number; y: number;
  /** Main portrait, used on the detail screen and the map card. */
  imageUrl: string;
  /** Pixel-art character placed in front of the house on the map. */
  mapImageUrl: string;
  hasPromotion: boolean; promotion: Promotion | null;
  building: Building;
  description: string;
  hours: string;
  menu: MenuItem[];
  reviews: Review[];
  actionLabel: string;
}
const ASSET = 'https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/';

function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
// Storefront anchors on the source map; shuffled once per session.
const houses: Building[] = shuffled([
  { x: 60, y: 40, w: 43, h: 60 },
  { x: 127, y: 40, w: 43, h: 60 },
  { x: 208, y: 49, w: 39, h: 51 },
  { x: 255, y: 49, w: 44, h: 51 },
  { x: 337, y: 40, w: 43, h: 60 },
  { x: 470, y: 284, w: 44, h: 60 },
]);
type Base = Omit<Store, 'x' | 'y' | 'building'>;
const baseStores: Base[] = [
  {
    id: 'padaria-do-joao', name: 'Padaria do João', category: 'Padaria', isOpen: true,
    imageUrl: ASSET + '1793685732847-Prompt_baker_front_view_standing_in_front_of_a_table_smiling.jpg',
    mapImageUrl: ASSET + '1793685810257-uma_imagem_retangular_de_um_padeiro_em_estilo_retro_pixel_16.jpg',
    hasPromotion: true, promotion: { discount: '-28%', description: '2x1: Croissant Doce!' },
    description: 'Pães quentinhos saindo do forno a cada hora, com receitas de família e café passado na hora.',
    hours: 'Segunda a sábado · 06:00 – 19:00',
    menu: [{ name: 'Croissant doce', price: 'R$ 7,50' }, { name: 'Pão francês (kg)', price: 'R$ 16,00' }, { name: 'Bolo de cenoura', price: 'R$ 6,00' }],
    reviews: [{ author: 'Marina', rating: 5, text: 'Melhor croissant do bairro!' }, { author: 'Caio', rating: 4, text: 'Sempre fresquinho.' }],
    actionLabel: 'Reservar fornada',
  },
  {
    id: 'conveniencia-familia', name: 'Conveniência da Família', category: 'Conveniência', isOpen: true,
    imageUrl: 'https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793920926549-Prompt_family_of_convenience_store_owners_tall_father_with_s-1-.jpg',
    mapImageUrl: 'https://ktiwocwgcnvfffxjhmrm.supabase.co/storage/v1/object/public/assets/gv-ed976qut/1793731315247-51037-no-bg.toolszone.net.png',
    hasPromotion: false, promotion: null,
    description: 'Tudo o que você precisa, a qualquer hora: bebidas, lanches e itens do dia a dia, atendidos pela família.',
    hours: 'Todos os dias · 07:00 – 23:00',
    menu: [{ name: 'Água mineral', price: 'R$ 3,00' }, { name: 'Sanduíche natural', price: 'R$ 12,00' }, { name: 'Café expresso', price: 'R$ 5,00' }],
    reviews: [{ author: 'Paula', rating: 5, text: 'Atendimento muito caloroso.' }, { author: 'Rui', rating: 4, text: 'Salva em qualquer hora.' }],
    actionLabel: 'Reservar produtos',
  },
  {
    id: 'acai-do-davi', name: 'Açaí do Davi', category: 'Açaí', isOpen: true,
    imageUrl: ASSET + '1793685768811-Prompt_young_dark-skinned_man_smiling_drinking_acai_bowl_on-1-.jpg',
    mapImageUrl: ASSET + '1793685820965-uma_imagem_retangular_de_um_acaoteiro_um_rapaz_que_vende_aa.jpg',
    hasPromotion: true, promotion: { discount: '-20%', description: 'Açaí 500ml com 3 acompanhamentos.' },
    description: 'Açaí cremoso batido na hora, com frutas frescas e acompanhamentos à vontade.',
    hours: 'Terça a domingo · 11:00 – 22:00',
    menu: [{ name: 'Açaí 300ml', price: 'R$ 14,00' }, { name: 'Açaí 500ml', price: 'R$ 20,00' }, { name: 'Vitamina de cupuaçu', price: 'R$ 11,00' }],
    reviews: [{ author: 'Bia', rating: 5, text: 'Cremoso demais!' }, { author: 'Leo', rating: 5, text: 'Melhor açaí da cidade.' }],
    actionLabel: 'Reservar açaí',
  },
  {
    id: 'quentinha-da-dona-rosa', name: 'Quentinha da Dona Rosa', category: 'Restaurante', isOpen: false,
    imageUrl: ASSET + '1793685782658-Prompt_chubby_short_woman_selling_lunchboxes_side_profile_ca.jpg',
    mapImageUrl: ASSET + '1793685834242-uma_imagem_retangular_de_um_moa_que_vende_marmita_uma_moa_le.jpg',
    hasPromotion: true, promotion: { discount: '-15%', description: 'Marmita completa + suco.' },
    description: 'Comida caseira de verdade, feita todo dia com carinho e entregue ainda quente.',
    hours: 'Segunda a sexta · 11:00 – 15:00',
    menu: [{ name: 'Marmita completa', price: 'R$ 22,00' }, { name: 'Feijoada (sáb.)', price: 'R$ 28,00' }, { name: 'Suco natural', price: 'R$ 6,00' }],
    reviews: [{ author: 'Tânia', rating: 5, text: 'Tempero igual ao da vovó.' }, { author: 'Jorge', rating: 4, text: 'Porção generosa.' }],
    actionLabel: 'Reservar marmita',
  },
];
export const STORES: Store[] = baseStores.map((store, i) => {
  const building = houses[i];
  return {
    ...store,
    building,
    x: (building.x + building.w / 2) / 1230 * 100,
    y: (building.y + building.h) / 819 * 100,
  };
});
