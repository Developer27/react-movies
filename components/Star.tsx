type StarProps = {
  fill: number;
  id: string;
};

function Star({ fill, id }: StarProps) {
  const percent = Math.round(fill * 100);

  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${percent}%`} stopColor="#facc15" />
          <stop offset={`${percent}%`} stopColor="#444" />
        </linearGradient>
      </defs>

      <polygon
        fill={`url(#${id})`}
        fillRule="evenodd"
        points="
          12 2
          15.09 8.26
          22 9.27
          17 14.14
          18.18 21.02
          12 17.77
          5.82 21.02
          7 14.14
          2 9.27
          8.91 8.26
        "
      />
    </svg>
  );
}

export default Star;
