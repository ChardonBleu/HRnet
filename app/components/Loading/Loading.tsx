import type { ReactElement } from "react";

/**
 * Loading component for too long fetching datas
 * @return { ReactElement }
 */
export function Loading(): ReactElement {
  return (
    <>
      <section className="loader">
        <p>Loading ...</p>
        <div className="loader-anim"></div>
      </section>
    </>
  );
}
