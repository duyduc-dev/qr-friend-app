type EventRef = {
  name: string;
  handler: Function;
};

export class EventHelper {
  static count: number = 0;
  static eventRefs: { [id: string]: EventRef } = {};

  static dispatch<T>(eventName: string, data?: T) {
    Object.keys(EventHelper.eventRefs).forEach((idEvent) => {
      if (
        EventHelper.eventRefs?.[idEvent] &&
        EventHelper.eventRefs[idEvent].name === eventName
      ) {
        EventHelper.eventRefs[idEvent].handler(data);
      }
    });
  }

  static subscriber<T = any>(eventName: string, handler: (data: T) => void) {
    const idEvent = `idEvent-${eventName}-${EventHelper.count++}`;
    EventHelper.eventRefs[idEvent] = {
      name: eventName,
      handler,
    };
    return {
      id: idEvent,
      remove: () => EventHelper.remove(idEvent),
    };
  }

  static remove(idEvent: string) {
    if (EventHelper.eventRefs[idEvent]) {
      delete EventHelper.eventRefs[idEvent];
    }
  }

  static removeAllEvent(ids: string[] = []) {
    if (ids.length === 0) {
      EventHelper.eventRefs = {};
    } else {
      ids.forEach((id) => {
        EventHelper.eventRefs[id] && delete EventHelper.eventRefs[id];
      });
    }
  }
}
