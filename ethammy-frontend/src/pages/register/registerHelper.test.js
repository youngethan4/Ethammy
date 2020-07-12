import Validate from './registerHelper.js';
import { BLANK, ACCEPTED, ERROR } from '../../constants/register.js';

describe('Name tests', () => {
    test('Numbers', () => {
        expect(Validate.checkName("123412425")).toStrictEqual(ERROR);
    });
    test('Specials', () => {
        expect(Validate.checkName("#@%^$@#$")).toStrictEqual(ERROR);
        expect(Validate.checkName(".")).toStrictEqual(ERROR);
        expect(Validate.checkName("::::::")).toStrictEqual(ERROR);
    });
    test('Numbers and characters', () => {
        expect(Validate.checkName("12fdFDS2425")).toStrictEqual(ERROR);
        expect(Validate.checkName("John4")).toStrictEqual(ERROR);
        expect(Validate.checkName("0Ethan")).toStrictEqual(ERROR);
    });
    test('Specials and characters', () => {
        expect(Validate.checkName("$%$fgfdDGFD")).toStrictEqual(ERROR);
        expect(Validate.checkName("^Hailey")).toStrictEqual(ERROR);
        expect(Validate.checkName("Ben .")).toStrictEqual(ERROR);
    });
    test('Blank', () => {
        expect(Validate.checkName("")).toStrictEqual(BLANK);
    });
    test('Characters', () => {
        expect(Validate.checkName("Ethan")).toStrictEqual(ACCEPTED);
        expect(Validate.checkName("hi")).toStrictEqual(ACCEPTED);
        expect(Validate.checkName("cool Dude")).toStrictEqual(ACCEPTED);
        expect(Validate.checkName("BROTHER")).toStrictEqual(ACCEPTED);
    });
});

describe('Username tests', () => {
    test('Blank', () => {
        expect(Validate.checkUsername("")).toStrictEqual(BLANK);
    });
    test('Specials', () => {
        expect(Validate.checkUsername("CoolDude#2")).toStrictEqual(ERROR);
        expect(Validate.checkUsername(".543fd45gv")).toStrictEqual(ERROR);
        expect(Validate.checkUsername("@Ethanman4")).toStrictEqual(ERROR);
    });
    test('Characters only', () => {
        expect(Validate.checkUsername("CoolDude")).toStrictEqual(ACCEPTED);
        expect(Validate.checkUsername("cooldude")).toStrictEqual(ACCEPTED);
    });
    test('Numbers only', () => {
        expect(Validate.checkUsername("12346")).toStrictEqual(ACCEPTED);
        expect(Validate.checkUsername("564326")).toStrictEqual(ACCEPTED);
    });
    test('Characters and numbers', () => {
        expect(Validate.checkUsername("4CoolDude")).toStrictEqual(ACCEPTED);
        expect(Validate.checkUsername("Ethanman90")).toStrictEqual(ACCEPTED);
    });
});

describe('Email tests', () => {
    test('Blank', () => {
        expect(Validate.checkEmail("")).toStrictEqual(BLANK);
    });
    test('No @', () => {
        expect(Validate.checkEmail("ethangmail.com")).toStrictEqual(ERROR);
    });
    test('No .', () => {
        expect(Validate.checkEmail("ethan@gmailcom")).toStrictEqual(ERROR);
    });
    test('No @ and .', () => {
        expect(Validate.checkEmail("ethangmailcom")).toStrictEqual(ERROR);
    });
    test('Empty before or after @ or .', () => {
        expect(Validate.checkEmail("@gmail.com")).toStrictEqual(ERROR);
        expect(Validate.checkEmail("ethan@.com")).toStrictEqual(ERROR);
        expect(Validate.checkEmail("ethan@gmail.")).toStrictEqual(ERROR);
    });
    test('Too many or few characters after .', () => {
        expect(Validate.checkEmail("ethan@gmail.c")).toStrictEqual(ERROR);
        expect(Validate.checkEmail("ethan@gmail.comm")).toStrictEqual(ERROR);
    });
    test('Specials', () => {
        expect(Validate.checkEmail("ethan!@gmail.com")).toStrictEqual(ERROR);
        expect(Validate.checkEmail("ethan@gm@il.com")).toStrictEqual(ERROR);
    });
    test('Number first', () => {
        expect(Validate.checkEmail("0EthanMan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.checkEmail("4ethan@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('With . before @', () => {
        expect(Validate.checkEmail("ethan.man@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('accepted characters', () => {
        expect(Validate.checkEmail("EthanMan@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.checkEmail("ethan@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('accepted characters and numbers', () => {
        expect(Validate.checkEmail("EthanMan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.checkEmail("ethan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.checkEmail("ethan4@something.co")).toStrictEqual(ACCEPTED);
    });
});

// Supported characters !@#$%^&*.,
describe('Password tests', () => {
    test('Blank', () => {
        expect(Validate.checkPassword("")).toStrictEqual(BLANK);
    });
    test('Unsupported characters', () => {
        expect(Validate.checkPassword("!@#$%^&*.,gvsd<>")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("jdf;;.FDSA4534")).toStrictEqual(ERROR);
    });
    test('Fewer than 10 characters', () => {
        expect(Validate.checkPassword(".")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("1234567T9")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("hello$@#3")).toStrictEqual(ERROR);
    });
    test('One character type', () => {
        expect(Validate.checkPassword("morethantenstill")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("1234567890")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("HELLOHOWAREYOU")).toStrictEqual(ERROR);
        expect(Validate.checkPassword("@#$%^&$!!...,,$#")).toStrictEqual(ERROR);
    });
    test('Two or more characters types and 10 or more characters', () => {
        expect(Validate.checkPassword("!@#$.,gvsdGG")).toStrictEqual(ACCEPTED);
        expect(Validate.checkPassword("jdf.FDSA4534")).toStrictEqual(ACCEPTED);
        expect(Validate.checkPassword("jdf.FDSA4534")).toStrictEqual(ACCEPTED);
        expect(Validate.checkPassword("holaSENORbuba")).toStrictEqual(ACCEPTED);
        expect(Validate.checkPassword("#bl@ckLivesM@TTER!")).toStrictEqual(ACCEPTED);
    });
});

describe('Confirm password tests', () => {
    test('Blank', () => {
        expect(Validate.matchPasswords("","")).toStrictEqual(BLANK);
        expect(Validate.matchPasswords("PASSWORDhere","")).toStrictEqual(BLANK);
    });
    test('Not same', () => {
        expect(Validate.matchPasswords("PASSWORDhere", "passwordhere")).toStrictEqual(ERROR);
        expect(Validate.matchPasswords("1234567890p", "fdsafdsafdsafdsaFDSA")).toStrictEqual(ERROR);
    });
    test('Same', () => {
        expect(Validate.matchPasswords("PASSWORDhere", "PASSWORDhere")).toStrictEqual(ACCEPTED);
        expect(Validate.matchPasswords("1234567890p", "1234567890p")).toStrictEqual(ACCEPTED);
    });
});