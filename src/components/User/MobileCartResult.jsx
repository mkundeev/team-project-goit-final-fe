import Cart from './Cart';
export default function MobileCartREsult({ data }) {
  const testing = [];
  const QAtesting = [];
  data.map(el =>
    el.topic === 'Testing theory' ? testing.push(el) : QAtesting.push(el)
  );

  const sumRight = test =>
    test.reduce((acc, el) => (acc += el.rightAnswers), 0);
  const sumWrong = test =>
    test.reduce((acc, el) => (acc += el.wrongAnswers), 0);

  const rightTesting = sumRight(testing);
  const wrongTesting = sumWrong(testing);
  const rightQATesting = sumRight(QAtesting);
  const wrongQATesting = sumWrong(QAtesting);

  const percentTesting = Math.round(
    testing.reduce((acc, item) => (acc += item.percent), 0) / testing.length
  );
  const percentQAtesting = Math.round(
    QAtesting.reduce((acc, item) => (acc += item.percent), 0) / QAtesting.length
  );

  return (
    <>
      <Cart
        topic="Testing theory"
        rightAnswers={rightTesting}
        wrongAnswers={wrongTesting}
        percent={percentTesting}
      />
      <Cart
        topic="QA technical training"
        rightAnswers={rightQATesting}
        wrongAnswers={wrongQATesting}
        percent={percentQAtesting}
      />
    </>
  );
}
