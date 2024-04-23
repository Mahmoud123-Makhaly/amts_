import { IJsonLd } from '../contracts';
import { JsonLdTypes, JsonLdOfferTypes, JsonLdAvailability } from '../models';

export class JsonLd extends IJsonLd {
  constructor(type: JsonLdTypes, name: string, description: string, image: string) {
    super(type, name, description, image);
  }

  build(): string {
    return JSON.stringify(this.JsonLd);
  }

  bindKVPair(key: string, value: any): void {
    this.JsonLd[key] = value;
  }

  bindOffer(
    type: JsonLdOfferTypes,
    availability: JsonLdAvailability,
    priceCurrency: string,
    highPrice: string,
    lowPrice: string,
  ): void {
    this.JsonLd.offers = {
      '@type': type.toString(),
      availability: availability,
      priceCurrency: priceCurrency,
      highPrice: highPrice,
      lowPrice: lowPrice,
    };
  }
}
