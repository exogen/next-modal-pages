import App, { Container } from "next/app";
import PageManager from "../components/PageManager";

export default class ModalApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const level = ctx.req ? 0 : parseInt(ctx.query.modal, 10) || 0;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, level, url: ctx.asPath };
  }

  render() {
    const { Component, pageProps, level, url } = this.props;
    const page = <Component {...pageProps} />;
    return (
      <Container>
        <PageManager page={page} level={level} url={url} />
      </Container>
    );
  }
}
