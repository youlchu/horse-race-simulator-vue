# 🏇 At Yarışı Simülasyonu

Vue 3 + TypeScript + Vite + Vuex ile geliştirilmiş interaktif bir at yarışı simülasyon uygulaması.

## 📋 Proje Hakkında

Bu proje, Vue 3'ün modern özellikleri kullanılarak geliştirilmiş bir at yarışı simülasyon uygulamasıdır. Kullanıcılar, birden fazla yarış turunu izleyebilir, atların performanslarını görebilir ve sonuçları takip edebilir.

### 🎯 Teknik Özellikler

- **Vue 3** - Composition API ve `<script setup>` syntax
- **TypeScript** - Tip güvenliği
- **Vite** - Hızlı geliştirme ve build
- **Vuex** - State management
- **Tailwind CSS** - Styling
- **Vitest** - Unit testing
- **Component-Based Architecture** - Modüler yapı

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
yarn install

# Geliştirme sunucusunu başlat
yarn dev

# Production build
yarn build

# Production preview
yarn preview
```

## 🧪 Test Komutları

```bash
# Tüm testleri çalıştır
yarn test

# Testleri watch mode'da çalıştır
yarn test

# Testleri bir kez çalıştır
yarn test:run

# Test UI'ı aç
yarn test:ui

# Coverage raporu oluştur
yarn test:coverage
```

## 📊 Test Stratejisi

Projede **86 kapsamlı unit test** yazılmıştır ve %95+ kod coverage sağlanmıştır.

### ✅ Test Edilen Modüller

#### 1. **Utility Fonksiyonlar** (`raceUtils.spec.ts` - 29 test)

**Test edilen fonksiyonlar:**

##### `shuffleArray()`

- ✅ Array'in aynı uzunlukta kalması
- ✅ Orijinal elemanların korunması
- ✅ Orijinal array'in değiştirilmemesi
- ✅ Boş array handling
- ✅ Tek elemanlı array handling
- ✅ Randomness kontrolü

##### `generateSchedule()`

- ✅ Belirtilen sayıda round oluşturma
- ✅ Varsayılan 6 round oluşturma
- ✅ Round yapısının doğruluğu (id, distance, participants, results, status)
- ✅ Mesafelerin artışı (1200m → 1400m → 1600m → 1800m)
- ✅ Her round için maksimum 10 katılımcı seçimi
- ✅ 10'dan az at varsa tümünün seçilmesi
- ✅ Her round için katılımcıların karıştırılması

##### `calculateSpeed()`

- ✅ Condition >= 90: hız 0.08-0.12 arası
- ✅ Condition 70-89: hız 0.05-0.10 arası
- ✅ Condition 50-69: hız 0.03-0.07 arası
- ✅ Condition < 50: hız 0.02-0.04 arası
- ✅ Sınır değer testleri (50, 70, 90)
- ✅ Randomness kontrolü (her çağrıda farklı değer)

##### `getColoredFilter()`

- ✅ Saf renkler için filter üretimi (red, green, blue)
- ✅ # prefix ile ve prefix olmadan hex renk desteği
- ✅ Grayscale renkler için filter
- ✅ Aynı renk için tutarlı çıktı
- ✅ Hue rotation değerinin 0-360° arası olması
- ✅ Filter string formatının doğruluğu

---

#### 2. **Vuex Store** (`race.spec.ts` - 26 test)

**Test edilen state management:**

##### Mutations (6 test)

- ✅ `SET_HORSES` - Atları state'e kaydetme ve değiştirme
- ✅ `SET_SCHEDULE` - Yarış programını ayarlama
- ✅ `SET_RACE_ACTIVE` - Yarış durumunu değiştirme (true/false)
- ✅ `NEXT_ROUND` - Tur index'ini artırma
- ✅ `ADD_RACE_RESULT` - Sonuçları state'e ekleme ve biriktirme
- ✅ `RESET_ROUND_INDEX` - Index'i sıfırlama

##### Actions (4 test)

- ✅ `initializeHorses` - Mock veriden atları yükleme ve kopyalama
- ✅ `createSchedule` -
  - Atlar yoksa otomatik initialize
  - Belirtilen sayıda round oluşturma
  - Varsayılan 6 round oluşturma
  - Round yapısının doğruluğu
  - Mesafe artışlarının kontrolü
- ✅ `toggleRace` - Yarışı başlatma/durdurma
- ✅ `addResult` - Action üzerinden sonuç ekleme

##### Getters (2 test)

- ✅ `activeRound` -
  - Schedule yoksa null dönmesi
  - İlk round'u döndürme
  - Index artınca doğru round'u döndürme
  - Index aşınca null dönmesi
- ✅ `totalRounds` - Toplam round sayısını döndürme

##### Integration Test (1 test)

- ✅ Tam workflow: Initialize → Create Schedule → Start Race → Add Result → Stop → Next Round

---

#### 3. **Race Engine Composable** (`useRaceEngine.spec.ts` - 31 test)

**Test edilen yarış motoru:**

##### Initialization (3 test)

- ✅ Default state değerleri (isRunning: false, positions, finishTimes)
- ✅ Tüm atlar için pozisyon başlangıç değeri 0
- ✅ Katılımcılar değiştiğinde state'in yeniden başlatılması

##### Race Control (8 test)

**start() fonksiyonu:**

- ✅ isRunning değerini true yapması
- ✅ Zaten çalışıyorsa tekrar başlatmaması
- ✅ Önceki finish time'ları temizlemesi
- ✅ Yarış sırasında pozisyonları güncellemesi
- ✅ Atlar finish line'ı geçtiğinde finish time kaydetmesi

**stop() fonksiyonu:**

- ✅ isRunning değerini false yapması
- ✅ Animation frame'i iptal etmesi
- ✅ Birden fazla çağrılabilmesi (güvenli)

**reset() fonksiyonu:**

- ✅ Yarışı durdurması
- ✅ Tüm pozisyonları 0'a sıfırlaması
- ✅ Finish time'ları temizlemesi

##### Getters (11 test)

**getPosition():**

- ✅ Başlangıçta 0 döndürmesi
- ✅ Bilinmeyen horse id için 0 döndürmesi
- ✅ Yarış sırasında güncel pozisyon döndürmesi

**getHorseImage():**

- ✅ Horse image döndürmesi
- ✅ Animation frame'leri arasında geçiş yapması

**getNamePosition():**

- ✅ Position <= 50 için 'back' döndürmesi
- ✅ Position > 50 için 'front' döndürmesi
- ✅ Position = 50 için 'back' döndürmesi

**getResults():**

- ✅ Sonuçları finish time'a göre sıralaması
- ✅ Doğru pozisyon numaraları ataması (1, 2, 3...)
- ✅ Horse detaylarını içermesi (id, name, color, finishTime, position)
- ✅ Bitmemiş atlar için 0 finish time ile sonuç döndürmesi

##### Lifecycle (2 test)

- ✅ Katılımcılar verildiğinde initialize edilmesi
- ✅ Component unmount olduğunda temizlik yapması

##### Edge Cases (3 test)

- ✅ Boş katılımcı listesi ile çalışması
- ✅ Tek katılımcı ile çalışması
- ✅ Finish line'ı geçmemesi (pozisyon <= 100)

---

## 🏗️ Proje Yapısı

```
src/
├── modules/
│   └── horse-race/              # At yarışı modülü
│       ├── _mocks/              # Test mock verileri
│       ├── components/          # Vue bileşenleri
│       │   ├── Hippodrome.vue   # Yarış pisti
│       │   ├── HorseList.vue    # At listesi
│       │   ├── RaceHeader.vue   # Başlık
│       │   ├── RaceResultDialog.vue # Sonuç dialogu
│       │   └── StatusPanel.vue  # Durum paneli
│       ├── composable/          # Composition API
│       │   ├── useRaceEngine.ts # Yarış motoru
│       │   └── __tests__/       # Composable testleri
│       ├── store/               # Vuex store
│       │   ├── index.ts         # Store tanımı
│       │   └── __tests__/       # Store testleri
│       ├── types/               # TypeScript tipleri
│       ├── utils/               # Yardımcı fonksiyonlar
│       │   ├── raceUtils.ts
│       │   └── __tests__/       # Utils testleri
│       └── views/
│           └── GamePage.vue     # Ana oyun sayfası
└── shared/                      # Paylaşılan bileşenler
    └── components/
        ├── base-button/         # Temel buton
        └── base-table/          # Temel tablo
```

## 🎯 Test Coverage

| Modül             | Test Sayısı | Coverage | Durum  |
| ----------------- | ----------- | -------- | ------ |
| Utils (raceUtils) | 29          | ~100%    | ✅     |
| Vuex Store        | 26          | ~95%     | ✅     |
| Race Engine       | 31          | ~90%     | ✅     |
| **TOPLAM**        | **86**      | **~95%** | **✅** |

## 🧪 Test Best Practices

Projede uygulanan test stratejileri:

### ✅ AAA Pattern (Arrange-Act-Assert)

```typescript
it("should shuffle array", () => {
  // Arrange (Hazırlık)
  const input = [1, 2, 3, 4, 5];

  // Act (İşlem)
  const result = shuffleArray(input);

  // Assert (Doğrulama)
  expect(result).toHaveLength(5);
});
```

### ✅ Test Isolation (İzolasyon)

- Her test bağımsızdır
- `beforeEach` ile temiz başlangıç
- `afterEach` ile cleanup
- Mock'lar her testte sıfırlanır

### ✅ Descriptive Naming (Açıklayıcı İsimler)

- Test isimleri ne test edildiğini açıkça belirtir
- `should` pattern kullanılır
- Edge case'ler açıkça belirtilir

### ✅ Edge Case Coverage

- Boş değerler
- Null/undefined
- Sınır değerler
- Hata durumları

### ✅ Mock Kullanımı

```typescript
// External dependencies mock'lanır
vi.mock("@/assets/images", () => ({
  horseImg1: "horse1.png",
  horseImg2: "horse2.png",
}));

// Browser API'leri mock'lanır
globalThis.requestAnimationFrame = vi.fn();
```

## 📖 TypeScript Desteği

Proje tam TypeScript desteği ile geliştirilmiştir:

- Strict mode aktif
- Type inference
- Interface ve Type tanımları
- Auto-import desteği

Daha fazla bilgi için [Vue TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup)'a bakabilirsiniz.

## 🛠️ Geliştirme

```bash
# Linting
yarn lint

# Formatting
yarn format

# Version release
yarn release
```

## 📝 Lisans

MIT
