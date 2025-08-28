const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((wv: any) => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = wv;
      if (getCLS) getCLS(onPerfEntry);
      if (getFID) getFID(onPerfEntry);
      if (getFCP) getFCP(onPerfEntry);
      if (getLCP) getLCP(onPerfEntry);
      if (getTTFB) getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
