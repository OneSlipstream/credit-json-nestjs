/* eslint-disable @typescript-eslint/ban-types */
export function undefValsToNull<T extends object | number | null | undefined>(
    obj: T
    ): T {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      
      if (Array.isArray(obj)) {
        return obj.map((o) => undefValsToNull(o)) as T;
      }
      
      const newObj: T = { ...obj };
      Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === 'object') {
          newObj[k] = undefValsToNull(obj[k]);
        } else {
          newObj[k] ??= null;
        }
      });
      return newObj as T;
    }
    
  
    