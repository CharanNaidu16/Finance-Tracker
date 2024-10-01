import React, { useEffect, useState } from "react";

const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(amount);

  const handleTextChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const getFlagUrl = (currency) =>
    `https://flagsapi.com/${countryList[currency]}/flat/32.png`;

  const fetchExchangeRate = async () => {
    if (fromCurrency && toCurrency) {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <div className="p-4 md:p-8 lg:p-12 rounded-md min-h-[45vh] w-full max-w-xl mx-auto flex flex-col justify-center items-center bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg mt-8 ">
      <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">
        Currency Converter
      </h2>
      <form className="w-full">
        <div className="mb-4">
          <p className="mb-1 font-medium">Enter Amount</p>
          <input
            className="w-full border-2 border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            type="number"
            onChange={handleTextChange}
            min="1"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="flex flex-col w-full mr-0 md:mr-2">
            <p className="mb-1 font-medium">From</p>
            <div className="flex items-center border-2 border-gray-300 rounded-md p-2 shadow-sm">
              <img
                src={getFlagUrl(fromCurrency)}
                alt={`${fromCurrency} Flag`}
                className="mr-2"
              />
              <select
                name="from"
                className="flex-1 outline-none bg-transparent"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {Object.keys(countryList).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <i className="fa-solid fa-arrow-right-arrow-left mx-2 text-lg text-gray-600"></i>
          <div className="flex flex-col w-full ml-0 md:ml-2">
            <p className="mb-1 font-medium">To</p>
            <div className="flex items-center border-2 border-gray-300 rounded-md p-2 shadow-sm">
              <img
                src={getFlagUrl(toCurrency)}
                alt={`${toCurrency} Flag`}
                className="mr-2"
              />
              <select
                name="to"
                className="flex-1 outline-none bg-transparent"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {Object.keys(countryList).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="mb-1 font-medium">Converted Amount</p>
          <input
            className="w-full border-2 border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={convertedAmount}
            readOnly
          />
        </div>
      </form>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-900 focus:outline-none md:w-[100%]">
        Convert
      </button>
    </div>
  );
};

export default CurrencyConverter;
