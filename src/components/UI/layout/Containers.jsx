export const AppContainer = (props) => {
  return (
    <section className={`bi-l-appContainer ${props.className}`}>
      {props.children}
    </section>
  );
}