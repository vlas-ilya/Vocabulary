import { Provider } from '@nestjs/common';

type Constructor<T> = { new (...args: any[]): T };

export function createProviders<T>(context: Constructor<T>): Array<Provider> {
  const keys = Reflect.ownKeys(context.prototype);
  const entityKeys = keys.filter((key) => Reflect.getMetadata('isEntity', context.prototype, key));

  const itselfProvider = {
    provide: context,
    useClass: context,
  } as Provider;

  const entityProviders = entityKeys.map(
    (key) =>
      ({
        provide: key,
        useFactory: (context: T) => context[key](),
        inject: [context],
      } as Provider),
  );

  return [itselfProvider, ...entityProviders];
}

export function Entity(): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('isEntity', true, target, propertyKey);

    const method = descriptor.value!;
    let result;

    descriptor.value = function () {
      if (!result) {
        result = method.apply(this, arguments);
      }
      return result;
    };
  };
}
