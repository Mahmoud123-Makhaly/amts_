import { JsonLdTypes, JsonLdOfferTypes, JsonLdAvailability } from '../models';

export abstract class IJsonLd {
  protected JsonLd: {
    name: string;
    description: string;
    image: string;
    [k: string]: any;
  };

  constructor(type: JsonLdTypes, name: string, description: string, image: string) {
    this.JsonLd = {
      '@context': 'https://schema.org',
      '@type': type.toString(),
      name: name,
      description: description,
      image: image,
    };
  }

  getJsonLd() {
    return this.JsonLd;
  }

  abstract build(): string;

  abstract bindKVPair(key: string, value: any): void;

  abstract bindOffer(
    type: JsonLdOfferTypes,
    availability: JsonLdAvailability,
    priceCurrency: string,
    highPrice: string,
    lowPrice: string,
  ): void;
}
