export class Variable {
  readonly id: string;
  readonly name: string;
  private readonly value: number;

  constructor(args: { id: string; name: string; value: number }) {
    this.id = args.id;
    this.name = args.name;
    this.value = args.value;
  }

  getValue() {
    return this.value;
  }
}

export class Simulator {
  readonly graph: {
    [id in string]: Variable;
  };

  constructor(args: { variables: Variable[] }) {
    this.graph = {};
    for (const variable of args.variables) {
      this.graph[variable.id] = variable;
    }
  }

  simulate(code: string) {
    const result = { value: 0 };
    const f = new Function('result', 'simulationGraph', code) as (
      result: { value: number },
      simulator: Simulator['graph']
    ) => void;
    try {
      f(result, this.graph);
    } catch (e) {
      console.error(e);
      return;
    }
    return result.value;
  }
}

export const simulator = new Simulator({
  variables: [
    new Variable({
      id: '1',
      name: 'variable1',
      value: 1,
    }),
    new Variable({
      id: '2',
      name: 'variable2',
      value: 2,
    }),
    new Variable({
      id: '2',
      name: 'variable2',
      value: 2,
    }),
    new Variable({
      id: '3',
      name: 'variable3',
      value: 3,
    }),
    new Variable({
      id: '4',
      name: 'variable4',
      value: 4,
    }),
  ],
});
