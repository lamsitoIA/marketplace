const sumar = (a, b) => a + b;
describe("Testing unitario con Jest", () => {
  it("Comprobando el resultado de una sumatoria", () => {
    const n1 = 4;
    const n2 = 5;
    const resultado = sumar(n1, n2);
    expect(resultado).toBe(9);
  });
});
/* aqui se ejecuta este spec como test para ver si esta testeando bien mas que nada de prueba */
