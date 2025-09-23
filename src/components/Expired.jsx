import { Link } from "react-router-dom";
import "../styles/expired.css";

export default function Expired() {
  return (
    <div className="bg-white grid place-content-center pb-[10%] inset-0 w-full h-full">
      <div class="cardExpired">
        <div class="headerExpired">
          <div class="imageExpired">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
          <div class="contentExpired">
            <span class="titleExpired">Zamówienia zamknięte</span>
            <p class="messageExpired">
              Śledź nasze profile, aby być na bieżąco z przyszłymi trasami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
