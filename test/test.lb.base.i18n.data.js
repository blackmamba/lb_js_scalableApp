/*
 * test.lb.base.i18n.data.js - Unit Tests of lb.base.i18n.data module
 *
 * Author:    Eric Bréchemier <legalbox@eric.brechemier.name>
 * Copyright: Legal-Box (c) 2010-2011, All Rights Reserved
 * License:   BSD License - http://creativecommons.org/licenses/BSD/
 * Version:   2011-01-05
 *
 * Based on Test Runner from bezen.org JavaScript library
 * CC-BY: Eric Bréchemier - http://bezen.org/javascript/
 */

/*requires lb.base.i18n.data.js */
/*jslint white:false, onevar:false, plusplus:false */
/*global lb, bezen, window, document */
(function() {
  // Builder of
  // Closure object for Test of lb.base.i18n.data

  // Define aliases
      /*requires bezen.assert.js */
  var assert = bezen.assert,
      /*requires bezen.object.js */
      object = bezen.object,
      /*requires bezen.testrunner.js */
      testrunner = bezen.testrunner;

  function testNamespace(){

    assert.isTrue( object.exists(window,'lb','base','i18n','data'),
                                 "lb.base.i18n.data namespace was not found");
  }

  function setUp(){

    // Unset the root language of the document, if any
    document.documentElement.removeAttribute('lang');

    // Note:
    // all language variants are removed before each test, to make sure that
    // the behavior is consistent when these tests are run as part of all tests
    lb.base.i18n.data.reset();
  }

  function testGetLanguageCodes(){
    var ut = lb.base.i18n.data.getLanguageCodes;
    setUp();

    assert.arrayEquals( ut(), [],     "no language codes expected initially");

    lb.base.i18n.data.addLanguageProperties('fr-Fr',{});
    lb.base.i18n.data.addLanguageProperties('en',{});
    lb.base.i18n.data.addLanguageProperties('fr-fr',{});
    lb.base.i18n.data.addLanguageProperties('fr',{});
    lb.base.i18n.data.addLanguageProperties('en-us',{});
    lb.base.i18n.data.addLanguageProperties('en-GB',{});
    lb.base.i18n.data.addLanguageProperties('',{});
    lb.base.i18n.data.addLanguageProperties('en-US',{});
    lb.base.i18n.data.addLanguageProperties('EN',{});
    assert.arrayEquals( ut(), ['','en','en-GB','en-us','fr','fr-Fr'],
                                  "unique list of language codes expected, "+
              " duplicates in a case-insensitive comparison must be ignored");
  }

  function testAddLanguageProperties(){
    var ut = lb.base.i18n.data.addLanguageProperties;
    setUp();

    var root = {name:'Root'};
    var english = {name:'English'};
    var englishUSA = {name:'EnglishUSA'};
    var englishGB = {name:'EnglishGB'};
    var french = {name:'French'};
    var frenchFrance = {name:'FrenchFrance'};
    var frenchCanada = {name:'FrenchCanada'};

    ut(undefined,{});
    ut(null,{});
    ut({},{});
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(), [],
               "null, undefined and other non-string values must be ignored");

    ut('en',english);
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(), ['en'],
                                        "language 'en' expected to be added");
    assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English',
                             "English property expected to be defined in en");
    assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'English',
                          "English property expected to be defined in en-GB");
    assert.equals( lb.base.i18n.data.getProperty('fr','name'), null,
                         "English property not expected to be defined in fr");

    ut('',root);
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(), ['','en'],
                                   "language codes '','en' expected sorted");
    assert.equals( lb.base.i18n.data.getProperty('','name'), 'Root',
                               "Root property expected to be defined in ''");
    assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English',
                               "Root property expected to be hidden in en");
    assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'English',
                            "Root property expected to be hidden in en-GB");
    assert.equals( lb.base.i18n.data.getProperty('fr','name'), 'Root',
                              "Root property expected to be defined in fr");

    ut('fr-FR',frenchFrance);
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(), ['','en','fr-FR'],
                          "3 language codes '','en','fr-FR' expected sorted");
    assert.equals( lb.base.i18n.data.getProperty('fr-FR','name'), 'FrenchFrance',
                     "FrenchFrance property expected to be defined in fr-FR");
    assert.equals( lb.base.i18n.data.getProperty('','name'), 'Root',
                    "FrenchFrance property not expected to be defined in ''");
    assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English',
                    "FrenchFrance property not expected to be defined in en");
    assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'English',
                 "FrenchFrance property not expected to be defined in en-GB");

    ut('fr',french);
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(),
                        ['','en','fr','fr-FR'],
                                          "4 language codes expected sorted");
    assert.equals( lb.base.i18n.data.getProperty('fr','name'), 'French',
                              "French property expected to be defined in fr");
    assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English',
                              "French property expected to be defined in en");
    assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'English',
                           "French property expected to be defined in en-GB");
    assert.equals( lb.base.i18n.data.getProperty('fr-FR','name'), 'FrenchFrance',
                           "French property expected to be hidden in fr-FR");

    ut('fr-CA',frenchCanada);
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(),
                        ['','en','fr','fr-CA','fr-FR'],
                                  "5 language codes expected sorted");
    assert.equals( lb.base.i18n.data.getProperty('fr-CA','name'), 'FrenchCanada',
                     "FrenchCanada property expected to be defined in fr-CA");
    assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English',
                    "FrenchCanada property not expected to be defined in en");
    assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'English',
                 "FrenchCanada property not expected to be defined in en-GB");
    assert.equals( lb.base.i18n.data.getProperty('fr','name'), 'French',
                    "FrenchCanada property not expected to be defined in fr");

    ut('en-GB',englishGB);
    ut('en-US',englishUSA);

    var root2 = {name:'Root2'};
    var french2 = {name:'French2'};
    var frenchFrance2 = {name:'FrenchFrance2'};
    var frenchCanada2 = {name:'FrenchCanada2'};
    var english2 = {name:'English2'};
    var englishUSA2 = {name:'EnglishUSA2'};
    var englishGB2 = {name:'EnglishGB2'};

    ut('',root2);
    ut('FR',french2);
    ut('FR-ca',frenchCanada2);
    ut('fr-fr',frenchFrance2);
    ut('EN',english2);
    ut('en-us',englishUSA2);
    ut('En-Gb',englishGB2);

    try {
      assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(),
                        ['','en','en-GB','en-US','fr','fr-CA','fr-FR'],
                   "7 language variants expected sorted, without duplicates");
      assert.equals( lb.base.i18n.data.getProperty('','name'), 'Root2',
                               "Root2 property expected to be defined in ''");
      assert.equals( lb.base.i18n.data.getProperty('fr','name'), 'French2',
                             "French2 property expected to be defined in fr");
      assert.equals( lb.base.i18n.data.getProperty('fr-CA','name'), 'FrenchCanada2',
                    "FrenchCanada2 property expected to be defined in fr-CA");
      assert.equals( lb.base.i18n.data.getProperty('fr-FR','name'), 'FrenchFrance2',
                    "FrenchFrance2 property expected to be defined in fr-FR");
      assert.equals( lb.base.i18n.data.getProperty('en','name'), 'English2',
                             "English2 property expected to be defined in en");
      assert.equals( lb.base.i18n.data.getProperty('en-US','name'), 'EnglishUSA2',
                      "EnglishUSA2 property expected to be defined in en-US");
      assert.equals( lb.base.i18n.data.getProperty('en-GB','name'), 'EnglishGB2',
                      "EnglishGB2 property expected to be defined in en-GB");
    } catch(e) {
      assert.fail("Property defined last shall hide/replace previous: "+e);
    }
  }

  function testGetProperty(){
    var ut = lb.base.i18n.data.getProperty;
    setUp();

    assert.equals( ut(), null,
   "null expected for undefined property in undefined language (no language)");
    assert.equals( ut(''), null,
                  "null expected for undefined property in '' (no language)");
    assert.equals( ut('','test'), null,
                     "null expected for 'test' property in '' (no language)");
    assert.equals( ut({},'test'), null,
                     "null expected for 'test' property in {} (no language)");
    assert.equals( ut('','section.subsection.test'), null,
                     "null expected for dotted property in '' (no language)");
    assert.equals( ut('','section','subsection','test'), null,
              "null expected for nested 'test' property in '' (no language)");

    lb.base.i18n.data.addLanguageProperties('',
      {
        name: 'root',
        empty: '',
        test: 'Root Value'
      }
    );

    assert.equals( ut('fr-FR'), null,
                      "null expected for undefined property in fr-FR (root)");
    assert.equals( ut({},'missing'), null,
                        "null expected for missing property in {} (root)");
    assert.equals( ut('fr-FR','missing'), null,
                        "null expected for missing property in fr-FR (root)");
    assert.equals( ut('fr-FR','empty'), '',
                  "empty string expected for empty property in fr-FR (root)");
    assert.equals( ut('fr-FR','test'), 'Root Value',
                   "Root Value expected for 'test' property in fr-FR (root)");
    assert.equals( ut('fr-FR','section.subsection.test'), null,
                  "null expected for dotted nested property in fr-FR (root)");
    assert.equals( ut('fr-FR','section','subsection','test'), null,
                  "null expected for nested 'test' property in fr-FR (root)");

    lb.base.i18n.data.addLanguageProperties('fr',
      {
        name: 'french',
        section:{
          subsection: {
            test: 'French Value'
          }
        }
      }
    );

    assert.equals( ut('fr-FR'), null,
                   "null expected for undefined property in fr-FR (root,fr)");
    assert.equals( ut('fr-FR','missing'), null,
                     "null expected for missing property in fr-FR (root,fr)");
    assert.equals( ut('fr-FR','empty'), '',
               "empty string expected for empty property in fr-FR (root,fr)");
    assert.equals( ut('fr-FR','test'), 'Root Value',
                "Root Value expected for 'test' property in fr-FR (root,fr)");
    assert.equals( ut('fr-FR','section.subsection.test'), 'French Value',
       "French Value expected for dotted nested property in fr-FR (root,fr)");
    assert.equals( ut('fr-FR',['section','subsection','test']), 'French Value',
       "French Value expected for nested 'test' property in fr-FR (root,fr)");

    lb.base.i18n.data.addLanguageProperties('frog',
      {
      }
    );
    assert.equals( ut('frog','name'), 'root',
           "'frog' must not inherit 'name' property from 'fr' (root,fr,frog)");

    lb.base.i18n.data.addLanguageProperties('fr-FR',
      {
        name: 'french-France',
        test: 'First France Value',
        section:{
          subsection: {
            test: 'Second France Value'
          }
        }
      }
    );

    assert.equals( ut('fr-FR'), null,
             "null expected for undefined property in fr-FR (root,fr,fr-FR)");
    assert.equals( ut('fr-FR','missing'), null,
               "null expected for missing property in fr-FR (root,fr,fr-FR)");
    assert.equals( ut('fr-FR','empty'), '',
         "empty string expected for empty property in fr-FR (root,fr,fr-FR)");
    assert.equals( ut('fr-FR','test'), 'First France Value',
  "First France Value expected for 'test' property in fr-FR (root,fr,fr-FR)");
    assert.equals( ut('fr-FR','section.subsection.test'),
                   'Second France Value',
                    "Second France Value expected for dotted nested property"+
                                                  "in fr-FR (root,fr,fr-FR)");
    assert.equals( ut('fr-FR',['section','subsection','test']),
                   'Second France Value',
                    "Second France Value expected for nested 'test' property"+
                                                  "in fr-FR (root,fr,fr-FR)");

    try {
      assert.equals( ut('FR-fr'), null,
             "null expected for undefined property in FR-FR (root,fr,fr-FR)");
      assert.equals( ut('FR-fr','missing'), null,
               "null expected for missing property in FR-fr (root,fr,fr-FR)");
      assert.equals( ut('FR-fr','empty'), '',
         "empty string expected for empty property in FR-fr (root,fr,fr-FR)");
      assert.equals( ut('FR-fr','test'), 'First France Value',
  "First France Value expected for 'test' property in FR-fr (root,fr,fr-FR)");
      assert.equals( ut('FR-fr','section.subsection.test'),
                   'Second France Value',
                    "Second France Value expected for dotted nested property"+
                                                  "in FR-fr (root,fr,fr-FR)");
      assert.equals( ut('FR-fr',['section','subsection','test']),
                   'Second France Value',
                    "Second France Value expected for nested 'test' property"+
                                                  "in FR-fr (root,fr,fr-FR)");
    } catch(e) {
      assert.fail("Case-insensitive comparison on language code expected: "+e);
    }

    assert.equals( ut('fr'), null,
                "nullt.lb.base.i18n.jsexpected for undefined property in fr (root,fr,fr-FR)");
    assert.equals( ut('fr','missing'), null,
                  "null expected for missing property in fr (root,fr,fr-FR)");
    assert.equals( ut('fr','empty'), '',
            "empty string expected for empty property in fr (root,fr,fr-FR)");
    assert.equals( ut('fr','test'), 'Root Value',
             "Root Value expected for 'test' property in fr (root,fr,fr-FR)");
    assert.equals( ut('fr','section.subsection.test'), 'French Value',
    "French Value expected for dotted nested property in fr (root,fr,fr-FR)");
    assert.equals( ut('fr',['section','subsection','test']), 'French Value',
    "French Value expected for nested 'test' property in fr (root,fr,fr-FR)");

    assert.equals( ut(''), null,
                 "null expected for undefined property in '' (root,fr,fr-FR)");
    assert.equals( ut('','missing'), null,
                   "null expected for missing property in '' (root,fr,fr-FR)");
    assert.equals( ut('','empty'), '',
             "empty string expected for empty property in '' (root,fr,fr-FR)");
    assert.equals( ut('','test'), 'Root Value',
              "Root Value expected for 'test' property in '' (root,fr,fr-FR)");
    assert.equals( ut('','section.subsection.test'), null,
             "null expected for dotted nested property in '' (root,fr,fr-FR)");
    assert.equals( ut('','section','subsection','test'), null,
             "null expected for nested 'test' property in '' (root,fr,fr-FR)");
  }

  function testReset(){
    var ut = lb.base.i18n.data.reset;
    setUp();

    lb.base.i18n.data.addLanguageProperties('',{});
    lb.base.i18n.data.addLanguageProperties('fr',{});
    lb.base.i18n.data.addLanguageProperties('en',{});

    ut();
    assert.arrayEquals( lb.base.i18n.data.getLanguageCodes(), [],
                               "no more language codes expected after reset");
  }

  var tests = {
    testNamespace: testNamespace,
    testGetLanguageCodes: testGetLanguageCodes,
    testAddLanguageProperties: testAddLanguageProperties,
    testGetProperty: testGetProperty,
    testReset: testReset
  };

  testrunner.define(tests, "lb.base.i18n.data");
  return tests;

}());