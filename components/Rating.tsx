import Star from "./Star";

type RatingProps = {
  score: number;
};

export function Rating({ score }: RatingProps) {
  const rating = Math.max(0, Math.min(5, score / 2));

  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - i));

        return <Star key={i} fill={fill} id={`star-${i}}`} />;
      })}
    </div>
  );
}
