FROM arm32v7/python:3.7.2-stretch

WORKDIR /usr/app

# Install SPI-Py
RUN git clone https://github.com/lthiery/SPI-Py.git
RUN cd SPI-Py && git checkout 8cce26b9ee6e69eb041e9d5665944b88688fca68 && python setup.py install

COPY ./rfid-reader/requirements.txt /usr/app
RUN pip install -r requirements.txt

COPY ./rfid-reader/ /usr/app

CMD python Read.py
