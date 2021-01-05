/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { readdir, unlink, writeFile } = require('fs/promises');
const { db } = require('../src/db.server');

const NOTES_PATH = './notes';

async function seed() {
  const oldNotes = await readdir(path.resolve(NOTES_PATH));
  await Promise.all(
    oldNotes
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => unlink(path.resolve(NOTES_PATH, filename))),
  );

  await Promise.all(
    db.map((note) => {
      const id = note.id;
      const content = note.body;
      const data = new Uint8Array(Buffer.from(content));
      return writeFile(path.resolve(NOTES_PATH, `${id}.md`), data, (err) => {
        if (err) {
          throw err;
        }
      });
    }),
  );
}

seed();
