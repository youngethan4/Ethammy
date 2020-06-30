import Validate from './registerHelper.js';
import { BLANK, ACCEPTED, ERROR } from './registerHelper.js';

describe('Name tests', () => {
    test('Numbers', () => {
        expect(Validate.CheckName("123412425")).toStrictEqual(ERROR);
    });
    test('Specials', () => {
        expect(Validate.CheckName("#@%^$@#$")).toStrictEqual(ERROR);
        expect(Validate.CheckName(".")).toStrictEqual(ERROR);
        expect(Validate.CheckName("::::::")).toStrictEqual(ERROR);
    });
    test('Numbers and characters', () => {
        expect(Validate.CheckName("12fdFDS2425")).toStrictEqual(ERROR);
        expect(Validate.CheckName("John4")).toStrictEqual(ERROR);
        expect(Validate.CheckName("0Ethan")).toStrictEqual(ERROR);
    });
    test('Specials and characters', () => {
        expect(Validate.CheckName("$%$fgfdDGFD")).toStrictEqual(ERROR);
        expect(Validate.CheckName("^Hailey")).toStrictEqual(ERROR);
        expect(Validate.CheckName("Ben .")).toStrictEqual(ERROR);
    });
    test('Blank', () => {
        expect(Validate.CheckName("")).toStrictEqual(BLANK);
    });
    test('Characters', () => {
        expect(Validate.CheckName("Ethan")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckName("hi")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckName("cool Dude")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckName("BROTHER")).toStrictEqual(ACCEPTED);
    });
});

describe('Username tests', () => {
    test('Blank', () => {
        expect(Validate.CheckUsername("")).toStrictEqual(BLANK);
    });
    test('Specials', () => {
        expect(Validate.CheckUsername("CoolDude#2")).toStrictEqual(ERROR);
        expect(Validate.CheckUsername(".543fd45gv")).toStrictEqual(ERROR);
        expect(Validate.CheckUsername("@Ethanman4")).toStrictEqual(ERROR);
    });
    test('Characters only', () => {
        expect(Validate.CheckUsername("CoolDude")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckUsername("cooldude")).toStrictEqual(ACCEPTED);
    });
    test('Numbers only', () => {
        expect(Validate.CheckUsername("12346")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckUsername("564326")).toStrictEqual(ACCEPTED);
    });
    test('Characters and numbers', () => {
        expect(Validate.CheckUsername("4CoolDude")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckUsername("Ethanman90")).toStrictEqual(ACCEPTED);
    });
});

describe('Email tests', () => {
    test('Blank', () => {
        expect(Validate.CheckUsername("")).toStrictEqual(BLANK);
    });
    test('No @', () => {
        expect(Validate.CheckEmail("ethangmail.com")).toStrictEqual(ERROR);
    });
    test('No .', () => {
        expect(Validate.CheckEmail("ethan@gmailcom")).toStrictEqual(ERROR);
    });
    test('No @ and .', () => {
        expect(Validate.CheckEmail("ethangmailcom")).toStrictEqual(ERROR);
    });
    test('Empty before or after @ or .', () => {
        expect(Validate.CheckEmail("@gmail.com")).toStrictEqual(ERROR);
        expect(Validate.CheckEmail("ethan@.com")).toStrictEqual(ERROR);
        expect(Validate.CheckEmail("ethan@gmail.")).toStrictEqual(ERROR);
    });
    test('Too many or few characters after .', () => {
        expect(Validate.CheckEmail("ethan@gmail.c")).toStrictEqual(ERROR);
        expect(Validate.CheckEmail("ethan@gmail.comm")).toStrictEqual(ERROR);
    });
    test('Specials', () => {
        expect(Validate.CheckEmail("ethan!@gmail.com")).toStrictEqual(ERROR);
        expect(Validate.CheckEmail("ethan@gm@il.com")).toStrictEqual(ERROR);
    });
    test('Number first', () => {
        expect(Validate.CheckEmail("0EthanMan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckEmail("4ethan@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('With . before @', () => {
        expect(Validate.CheckEmail("ethan.man@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('accepted characters', () => {
        expect(Validate.CheckEmail("EthanMan@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckEmail("ethan@gmail.com")).toStrictEqual(ACCEPTED);
    });
    test('accepted characters and numbers', () => {
        expect(Validate.CheckEmail("EthanMan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckEmail("ethan4@gmail.com")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckEmail("ethan4@something.co")).toStrictEqual(ACCEPTED);
    });
});

// Supported characters !@#$%^&*.,
describe('Password tests', () => {
    test('Blank', () => {
        expect(Validate.CheckPassword("")).toStrictEqual(BLANK);
    });
    test('Unsupported characters', () => {
        expect(Validate.CheckPassword("!@#$%^&*.,gvsd<>")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("jdf;;.FDSA4534")).toStrictEqual(ERROR);
    });
    test('Fewer than 10 characters', () => {
        expect(Validate.CheckPassword(".")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("1234567T9")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("hello$@#3")).toStrictEqual(ERROR);
    });
    test('One character type', () => {
        expect(Validate.CheckPassword("morethantenstill")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("1234567890")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("HELLOHOWAREYOU")).toStrictEqual(ERROR);
        expect(Validate.CheckPassword("@#$%^&$!!...,,$#")).toStrictEqual(ERROR);
    });
    test('Two or more characters types and 10 or more characters', () => {
        expect(Validate.CheckPassword("!@#$.,gvsdGG")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckPassword("jdf.FDSA4534")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckPassword("jdf.FDSA4534")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckPassword("holaSENORbuba")).toStrictEqual(ACCEPTED);
        expect(Validate.CheckPassword("#bl@ckLivesM@TTER!")).toStrictEqual(ACCEPTED);
    });
});

describe('Confirm password tests', () => {
    test('Blank', () => {
        expect(Validate.MatchPasswords("","")).toStrictEqual(BLANK);
        expect(Validate.MatchPasswords("PASSWORDhere","")).toStrictEqual(BLANK);
    });
    test('Not same', () => {
        expect(Validate.MatchPasswords("PASSWORDhere", "passwordhere")).toStrictEqual(ERROR);
        expect(Validate.MatchPasswords("1234567890p", "fdsafdsafdsafdsaFDSA")).toStrictEqual(ERROR);
    });
    test('Same', () => {
        expect(Validate.MatchPasswords("PASSWORDhere", "PASSWORDhere")).toStrictEqual(ACCEPTED);
        expect(Validate.MatchPasswords("1234567890p", "1234567890p")).toStrictEqual(ACCEPTED);
    });
});