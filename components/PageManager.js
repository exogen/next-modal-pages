import React, { useEffect, useRef, useState } from "react";
import StackInfoProvider from "./StackInfoProvider";
import PageModal from "./PageModal";

export default function PageManager({ page, level, url }) {
  const [stack, setStack] = useState(() => {
    // Must start at 0 at the beginning regardless of input, otherwise parents
    // will be empty. See HMR note below.
    return [{ page, level: 0 }];
  });

  // This fixes HMR, which preserves the modal level from `query` but resets
  // state, losing history. Without it, the highest modal after an HMR reload
  // would append to a stack with itself already on it (from the state
  // initialization above).
  if (stack[0].page === page) {
    level = 0;
  }

  useEffect(
    () => {
      setStack(prevStack => {
        return [...prevStack.slice(0, level), { page, url }];
      });
    },
    [page, level, url]
  );

  const topLevel = stack.length - 1;

  return stack.map((entry, thisLevel) => {
    const { page, url } = entry;
    const key = `${thisLevel}:${url}`;
    return (
      <StackInfoProvider key={key} thisLevel={thisLevel} topLevel={topLevel}>
        {thisLevel === 0 ? (
          <div aria-hidden={topLevel > thisLevel}>{page}</div>
        ) : (
          <PageModal>{page}</PageModal>
        )}
      </StackInfoProvider>
    );
  });
}
