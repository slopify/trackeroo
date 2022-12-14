import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import { mixColor } from '../../helpers/mixColor';

import encapsulateCss from '../../../helpers/encapsulateCss';

const DEFAULT_COLORS = {
    primary: '#000000',
    secondary: '#DFE3E8',
  };

const getColors = (primaryColor, secondaryColor) => {
  const colors = {
    primary: primaryColor || DEFAULT_COLORS.primary,
    secondary: secondaryColor || DEFAULT_COLORS.secondary,
    primaryHalf: mixColor('#ffffff', primaryColor, 0.3),
    primaryHover: mixColor('#ffffff', primaryColor, 0.8),
    primaryActive: mixColor('#ffffff', primaryColor, 0.7),
    badge: mixColor('#ffffff', primaryColor, 0.6),
    border: mixColor('#ffffff', primaryColor, 0.25),
    textMajor: mixColor('#ffffff', primaryColor, 0.7),
    textMinor: mixColor('#ffffff', primaryColor, 0.45),
    inputText: mixColor('#ffffff', primaryColor, 0.75),
  };

  return Object.entries(colors)
    .map(([key, value]) => `--${key}Color:${value};`)
    .join('');
};

const usePreviewFrame = (currentState, moneySymbol) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios('/tracking-page-preview');
      setData(res.data);
    })();
  }, []);

  const preparedMoneySymbol = useMemo(() => (moneySymbol || '').replace('{{amount}}', ''), [moneySymbol]);

  const preparedDate = useMemo(() => {
    if (data) {
      return data
        .replace('{{ localization.country.currency.symbol }}', preparedMoneySymbol)
        .replace('{{ localization.country.currency.iso_code }}', '');
    }
  }, [preparedMoneySymbol, data]);

  const cssVariables = useMemo(
    () => getColors(currentState.displayOptions.primaryColor, currentState.displayOptions.secondaryColor),
    [currentState.displayOptions.primaryColor, currentState.displayOptions.secondaryColor],
  );

  const customStyles = useMemo(
    () => encapsulateCss('#tracking-page-root', currentState.customStyling.customCss),
    [currentState.customStyling],
  );

  const variables = useMemo(
    () => ({
      aiProductRecommendations: currentState.productRecommendations.aiProductRecommendations,
      aiProductRecommendationsPosition: currentState.productRecommendations.aiProductRecommendationsPosition,
      blackListedLocation: currentState.hideUndesiredLocations.blackListedLocation,
      replacementMessage: currentState.hideUndesiredLocations.replacementMessage,
      keywords: currentState.hideUndesiredLocations.keywords,
      customHtmlTop: currentState.additionalContent.customHtmlTop || '',
      customHtmlBottom: currentState.additionalContent.customHtmlBottom || '',
      isTestMode: true,
    }),
    [currentState],
  );

  const estimateDeliveryTime = useMemo(() => {
    if (currentState.estimateDeliveryTime.deliveryDateEnabled) {
      const currentDate = new Date();
      const startDate = addDays(
        currentDate,
        Number(currentState.estimateDeliveryTime.deliveryDateStartDays),
      ).toISOString();
      const endDate = addDays(currentDate, Number(currentState.estimateDeliveryTime.deliveryDateEndDays)).toISOString();
      return `${startDate}|${endDate}`;
    }
    return null;
  }, [currentState.estimateDeliveryTime]);

  const dataWithVariables = useMemo(() => {
    if (preparedDate) {
      const variablesForReplace = JSON.stringify(variables).slice(1, -1);
      const dataWithEstimateDeliveryTime = preparedDate.replace(
        '"{{ESTIMATE_DELIVERY_DATE}}"',
        JSON.stringify(estimateDeliveryTime),
      );
      return dataWithEstimateDeliveryTime.replace('"customVars":"{{CUSTOM_VARS}}"', variablesForReplace);
    }
  }, [variables, estimateDeliveryTime, preparedDate]);

  const htmlFrameContent = useMemo(
    () =>
      dataWithVariables
        ? `
      <html>
        <head></head>
        <body>
          <style>${customStyles}</style>
          <div style="${cssVariables}" id="tracking-page-root"></div>
          ${dataWithVariables}
        </body>
      </html>
  `
        : null,
    [dataWithVariables, cssVariables, customStyles],
  );

  return htmlFrameContent;
};

export default usePreviewFrame;
