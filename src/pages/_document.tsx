import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";
import { getCssText } from "src/styles";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/sourcesans-variable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/lindenhill-italic.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <script async data-api="/_hive" src="/bee.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
