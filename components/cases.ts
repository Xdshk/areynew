export type CaseType = "image" | "pdf";

export interface CaseItem {
  id: string;
  type: CaseType;
  title: string;
  category: string;
  description: string;
  /** URL к файлу (PNG, JPG или PDF) */
  media: string;
  /** URL к PNG-превью (для PDF — первая страница, для image — миниатюра) */
  thumb?: string;
}

/**
 * Реальные кейсы портфолио Arey Agency.
 */
export const cases: CaseItem[] = [
  {
    id: "01",
    type: "pdf",
    title: "Night Pulse",
    category: "Фестивальный кей-вижуал",
    description:
      "Полный визуальный пакет для фестиваля Night Pulse: ключевой визуал, афиши для соцсетей, баннеры. Концепция строилась вокруг идеи ночного пульса — ритмичное сочетание неоновых градиентов и жёсткой типографики.",
    media: "/cases/night-pulse-deck.pdf",
    thumb: "/cases/night-pulse-thumb.png",
  },
  {
    id: "02",
    type: "image",
    title: "Black Room",
    category: "Серия афиш",
    description:
      "Серия монохромных афиш для закрытых вечеринок Black Room. Минимум цвета, максимум контраста — каждый постер работает как самостоятельное произведение.",
    media: "/cases/black-room-cards.jpg",
    thumb: "/cases/black-room-cards.jpg",
  },
  {
    id: "03",
    type: "pdf",
    title: "Shift",
    category: "Бренд-система",
    description:
      "Разработка системы айдентики для event-платформы Shift. Логотип, гайдлайн, шаблоны презентаций, дизайн интерфейса мобильного приложения.",
    media: "/cases/shift-brandbook.pdf",
    thumb: "/cases/shift-brandbook-thumb.png",
  },
  {
    id: "04",
    type: "image",
    title: "Voltage",
    category: "Маркетинг-креативы",
    description:
      "Контрастный набор креативов для соцсетей и наружной рекламы. Каждый формат адаптирован под свою площадку, но единый стиль сохраняет узнаваемость бренда.",
    media: "/cases/voltage-vjrfg-3.png",
    thumb: "/cases/voltage-vjrfg-3.png",
  },
  {
    id: "05",
    type: "image",
    title: "СЕРФ",
    category: "Промо-материалы",
    description:
      "Визуальная серия для музыкального проекта СЕРФ. Промо-постеры и ключевой арт в духе underground-культуры с акцентом на текстуры и контрасты.",
    media: "/cases/surf-original.png",
    thumb: "/cases/surf-original.png",
  },
  {
    id: "06",
    type: "pdf",
    title: "Signal",
    category: "Фестивальный брендинг",
    description:
      "Полный брендинг летнего фестиваля Signal: от логотипа и визуальной системы до оформления площадок и мерча. Энергичный летний фестиваль в ограниченной палитре.",
    media: "/cases/signal-brandbook.pdf",
    thumb: "/cases/signal-brandbook-thumb.png",
  },
  {
    id: "07",
    type: "image",
    title: "T-Shirt Mockup",
    category: "Мерч-дизайн",
    description:
      "Работа по созданию макета для мерча — футболки с уникальным дизайном для фестивального мерчандайзинга.",
    media: "/cases/tshirt-mockup.png",
    thumb: "/cases/tshirt-mockup.png",
  },
  {
    id: "08",
    type: "image",
    title: "Serifika T20",
    category: "Упаковка",
    description:
      "Дизайн упаковки для линейки серебряных украшений. Минималистичная подача с акцентом на фактуру и детали.",
    media: "/cases/jewelry-t20.png",
    thumb: "/cases/jewelry-t20.png",
  },
];