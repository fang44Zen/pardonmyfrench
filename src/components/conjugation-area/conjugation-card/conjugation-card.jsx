import "./conjugation-card.scss";
import ConjInput from "./form-elem/conj-input";

const ConjugationCard = ({ answer }) => {
  return (
    <div className="conjugation-card">
      <div className="conjugation-card_card">
        <div className="conjugation-card_card_form">
          <ConjInput pronoun="Je/j'" answer={answer} />
          <ConjInput pronoun="Tu" answer={answer} />
          <ConjInput pronoun="Il/Elle" answer={answer} />
          <ConjInput pronoun="nous" answer={answer} />
          <ConjInput pronoun="vous" answer={answer} />
          <ConjInput pronoun="Ils/Elles" answer={answer} />

          <div>
            <button className="check-button">Check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjugationCard;
