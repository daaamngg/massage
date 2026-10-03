import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { operator } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Текст согласия на обработку персональных данных при записи через сайт мастерской Натальи Хасаншиной.",
  alternates: { canonical: "/consent" },
};

// С 1 сентября 2025 года согласие должно быть отдельным документом
// и не может прятаться внутри политики или оферты (156-ФЗ).
// Поэтому это своя страница, а в форме — своя галочка.
export default function ConsentPage() {
  return (
    <LegalPage title="Согласие на обработку персональных данных">
      <p>
        Отправляя заявку на сайте {site.domain.replace("https://", "")}{" "}
        и отмечая галочку «Даю согласие на обработку персональных данных»,
        я свободно, своей волей и в своём интересе даю согласие{" "}
        {operator.fullName}, {operator.status}, адрес: {operator.address}{" "}
        (далее — Оператор), на обработку моих персональных данных на следующих
        условиях.
      </p>

      <ol className="list-decimal space-y-4 pl-5">
        <li>
          <span className="text-cream">Какие данные.</span> Имя; номер
          телефона; выбранные услуги и мастер; удобные дата и время визита;
          текст комментария.
        </li>
        <li>
          <span className="text-cream">Цель.</span> Обработка заявки на запись,
          связь со мной для подтверждения записи и ответа на вопросы.
        </li>
        <li>
          <span className="text-cream">Действия.</span> Сбор, запись,
          систематизация, накопление, хранение, уточнение, извлечение,
          использование, передача (предоставление доступа), блокирование,
          удаление, уничтожение.
        </li>
        <li>
          <span className="text-cream">Способ.</span> Смешанная обработка —
          с использованием средств автоматизации и без них.
        </li>
        <li>
          <span className="text-cream">Передача.</span> Я согласен(-на), что
          для доставки заявки Оператору данные передаются через мессенджер
          Telegram и сообщения ВКонтакте и проходят через сервер хостинг-провайдера
          сайта, в том числе находящийся за пределами Российской Федерации
          (трансграничная передача).
        </li>
        <li>
          <span className="text-cream">Срок.</span> Согласие действует до
          достижения цели обработки или до его отзыва.
        </li>
        <li>
          <span className="text-cream">Отзыв.</span> Я могу отозвать согласие
          в любой момент — по телефону{" "}
          <a href={`tel:${operator.phoneHref}`} className="text-gold hover:underline">
            {operator.phone}
          </a>
          , через{" "}
          <a
            href={operator.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            сообщения ВКонтакте
          </a>{" "}
          или письмом по адресу Оператора. После отзыва данные уничтожаются
          в течение 30 дней.
        </li>
      </ol>

      <p>
        Подробно о том, как обрабатываются данные, — в{" "}
        <Link href="/privacy" className="text-gold hover:underline">
          политике обработки персональных данных
        </Link>
        .
      </p>
    </LegalPage>
  );
}
