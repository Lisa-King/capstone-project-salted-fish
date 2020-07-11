#!/usr/bin/python3
import yaml
from sqlalchemy import create_engine

class DB:
    def __init__(self):
        f = open('db.config', 'r', encoding='utf-8')
        config = yaml.load(f.read(), Loader=yaml.FullLoader)
        full_address = f"mysql+pymysql://{config['MySQL']['Username']}:{config['MySQL']['Password']}@{config['MySQL']['Address']}:{config['MySQL']['Port']}/{config['MySQL']['Database']}"
        self.engine = create_engine(full_address, pool_size=config['MySQL']['PoolSize'], max_overflow=config['MySQL']['PoolOverflow'], pool_timeout=config['MySQL']['PoolTimeout'])
        f.close()

    def conn(self):
        conn = self.engine.connect()
        return conn

