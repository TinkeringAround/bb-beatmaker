export type ValidatorFunction = (value: string) => string | null;

export class ValidatorService {
    static validateText(value: string): string | null {
        if (value == '') {
            return 'Dieses Feld ist erforderlich';
        }

        return null;
    }

    static validateEmail(
        value: string,
        blacklist: string[] = []
    ): string | null {
        if (value == '') {
            return 'Dieses Feld ist erforderlich';
        }

        const isEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
            );

        if (blacklist.includes(value)) {
            return 'Email schon vergeben';
        }

        return isEmail ? null : 'Bitte gebe eine gültige Email ein';
    }

    static validatePassword(value: string): string | null {
        if (value == '') {
            return 'Dieses Feld ist erforderlich';
        }

        if (value.length < 8 || value.length > 128) {
            return 'Verwende zwischen 8 und 128 Zeichen';
        }

        if (!/[A-Z]/.test(value)) {
            return 'Mindestens ein Großbuchstaben';
        }

        if (!/[a-z]/.test(value)) {
            return 'Mindestens ein Kleinbuchstaben';
        }

        if (!/\d/.test(value)) {
            return 'Mindestens eine Zahl';
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/]/.test(value)) {
            return 'Mindestens ein Sonderzeichen';
        }

        return null;
    }

    static validateBitcrusher(value: string) {
        console.log("here")
        try {
          if (Number(value) < 1 || Number(value) > 16) {
            return "Muss innerhalb [1, 16] liegen";
          }
  
          return null;
        } catch (_) {
          return null;
        }
      };
}
