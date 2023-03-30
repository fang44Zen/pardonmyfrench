const Enfant = ({ onCalculate, numChildValue }) => {
  const numChild = 42;

  const calculateNum = () => {
    onCalculate(numChild);
  };

  return (
    <div>
      <h3>Mon numero est {numChildValue}</h3>
      <button onClick={calculateNum}>calculate</button>
    </div>
  );
};
export default Enfant;
