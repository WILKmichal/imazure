interface StandardRatios {
    name: string;
    ratio: number;
  }

const   standardRatios:StandardRatios[] = [
    { name: "1:1", ratio: 1 },
    { name: "4:3", ratio: 4 / 3 },
    { name: "3:2", ratio: 3 / 2 },
    { name: "5:3", ratio: 5 / 3 },
    { name: "16:10", ratio: 16 / 10 },
    { name: "16:9", ratio: 16 / 9 },
    { name: "2.39:1", ratio: 2.39 },
    { name: "2.35:1", ratio: 2.35 },
    { name: "2.20:1", ratio: 2.2 },
  ];


export { standardRatios };
export type { StandardRatios };
