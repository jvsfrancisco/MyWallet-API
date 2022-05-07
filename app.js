import express, {json} from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import joi from 'joi';
