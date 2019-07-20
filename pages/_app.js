import React, { useEffect, useRef, useState } from "react";
import App, { Container } from "next/app";

function PageModal({ page, level, isTop }) {
  return (
    <div
      aria-hidden={!isTop}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        padding: level * 50
      }}
    >
      <div
        onClick={() => {
          window.history.back();
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.2)"
        }}
      />
      <div style={{ position: "relative", background: "white", padding: 20 }}>
        {page}
      </div>
    </div>
  );
}

function PageStackManager({ Component, pageProps, pageKey }) {
  const page = <Component {...pageProps} />;
  const prevPageKey = useRef(pageKey);
  const pageHistory = useRef([{ page, pageKey }]);

  if (pageKey !== prevPageKey.current) {
    // If the new key exists in the history, we'll remove all the pages after
    // the old entry and replace the old entry with the new page. Otherwise,
    // it's a new page to add onto the stack.
    const historyIndex = pageHistory.current.findIndex(
      entry => entry.pageKey === pageKey
    );
    if (historyIndex === -1) {
      pageHistory.current.push({ page, pageKey });
    } else {
      pageHistory.current = [
        ...pageHistory.current.slice(0, historyIndex),
        { page, pageKey }
      ];
    }
  }

  prevPageKey.current = pageKey;

  const bottomEntry = pageHistory.current[0];
  const isModal = pageKey !== bottomEntry.pageKey;
  const currentPageLevel = pageHistory.current.length - 1;
  const parentModalEntries = pageHistory.current.slice(1, -1);

  return (
    <>
      {bottomEntry && <div aria-hidden={isModal}>{bottomEntry.page}</div>}
      {parentModalEntries.map(({ page, pageKey }, i) => (
        <PageModal key={pageKey} page={page} level={i + 1} isTop={false} />
      ))}
      {isModal ? (
        <PageModal page={page} level={currentPageLevel} isTop />
      ) : null}
    </>
  );
}

export default class ModalApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, pageKey: ctx.asPath };
  }

  render() {
    const { Component, pageProps, pageKey } = this.props;
    return (
      <Container>
        <PageStackManager
          Component={Component}
          pageProps={pageProps}
          pageKey={pageKey}
        />
      </Container>
    );
  }
}
