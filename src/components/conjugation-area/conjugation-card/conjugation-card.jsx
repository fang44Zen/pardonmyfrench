import "./conjugation-card.scss";
import ConjInput from "./form-elem/conj-input";

const ConjugationCard = ({ answer }) => {
  return (
    <div className="conjugation-card">
      <div className="conjugation-card_card">
        <div className="conjugation-card_card_form">
          <ConjInput pronoun="Je/j'" answer={answer.je} />
          <ConjInput pronoun="Tu" answer={answer.tu} />
          <ConjInput pronoun="Il/Elle" answer={answer.il} />
          <ConjInput pronoun="nous" answer={answer.nous} />
          <ConjInput pronoun="vous" answer={answer.vous} />
          <ConjInput pronoun="Ils/Elles" answer={answer.ils} />

          <div>
            <button className="check-button">Check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjugationCard;
