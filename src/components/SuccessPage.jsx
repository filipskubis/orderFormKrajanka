import "../styles/success.css";
import { Link, useParams } from "react-router-dom";
export default function SuccessPage() {
  const { id } = useParams();
  return (
    <div className="bg-white grid place-content-center pb-[10%] inset-0 w-full h-full">
      <div class="card">
        <div class="header">
          <div class="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div class="content">
            <span class="title">Dziękujemy!</span>
            <p class="message">Zamówienie przyjęte do realizacji.</p>
          </div>
          <div class="actions">
            <Link to={`/${id}`} class="track">
              Zamów ponownie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
