import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// import the converted component dynamically to avoid SSR issues with DOM-only scripts
const ConvertedHtml = dynamic(() => import('../../components/ConvertedHtml'), { ssr: false });

export default function LegacyPage() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>Greenture — Legacy</title>
        {/* Styles (assumes CSS files are available in public/css/) */}
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/revolution-slider.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </Head>

      <ConvertedHtml />

  {/* Scripts: ensure jquery is available before other scripts */}
  <Script src="/js/jquery.js" strategy="beforeInteractive" />
      {/* Ensure a stable global reference immediately after jQuery loads so legacy plugins can use window.jQuery/window.$ */}
      <Script id="jquery-shim-legacy" strategy="beforeInteractive">{`(function(){
        if (typeof window !== 'undefined' && window.jQuery) {
          window.$ = window.$ || window.jQuery;
          window.jQuery = window.jQuery || window.$;
        }
      })();`}</Script>
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/revolution.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.fancybox.pack.js" strategy="afterInteractive" />
      <Script src="/js/jquery.fancybox-media.js" strategy="afterInteractive" />
      <Script src="/js/owl.js" strategy="afterInteractive" />
      <Script src="/js/wow.js" strategy="afterInteractive" />
      <Script src="/js/script.js" strategy="afterInteractive" />
    </>
  );
}
