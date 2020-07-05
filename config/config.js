var config = {};
config.dirs = {};

config.dirs.logdir = process.env.LOG_DIR || '.';

module.exports = config;