import "./conjugation-card.scss";

const ConjugationCard = () => {
  return (
    <div className="conjugation-card">
      <div className="conjugation-card_card">
        <div className="conjugation-card_card_title">
          <h3>Time to display:</h3>
        </div>
        <div className="conjugation-card_card_form">
          <div className="conjugation-card_card_form_input">
            <label>Je/j'</label>
            <input />
            <button>?</button>
          </div>
          <div className="conjugation-card_card_form_input">
            <label>Tu</label>
            <input />
            <button>?</button>
          </div>
          <div className="conjugation-card_card_form_input">
            <label>Il/Elle/On</label>
            <input />
            <button>?</button>
          </div>
          <div className="conjugation-card_card_form_input">
            <label>Nous</label>
            <input />
            <button>?</button>
          </div>
          <div className="conjugation-card_card_form_input">
            <label>Vous</label>
            <input />
            <button>?</button>
          </div>
          <div className="conjugation-card_card_form_input">
            <label>Ils/Elles</label>
            <input />
            <button>?</button>
          </div>
          <div>
            <button className="check-button">Check</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjugationCard;
