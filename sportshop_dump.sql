--
-- PostgreSQL database dump
--

\restrict dBSP033F7w0BPVhMsiDfJpWmhYzp0T7KKiU0zVVI65ndzGq2KX49NYCwVMXTQ9r

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    quantity integer
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying,
    price double precision,
    image_url character varying,
    category character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying,
    role character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, user_id, product_id, quantity) FROM stdin;
38	3	4	1
39	3	2	1
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity) FROM stdin;
1	1	1	1
2	1	2	1
3	2	1	1
4	2	10	1
5	2	2	1
6	2	4	1
7	2	5	1
8	3	1	1
9	3	10	1
10	3	4	1
11	4	10	1
12	5	1	1
13	5	5	1
14	5	10	1
15	5	4	1
16	6	2	1
17	6	10	1
18	6	1	1
19	6	4	1
20	7	12	1
21	7	13	1
22	8	2	2
23	8	10	2
24	8	13	1
25	9	4	1
26	10	2	1
27	10	10	1
28	11	2	1
29	11	13	1
30	12	12	1
31	12	11	1
32	13	14	1
33	13	1	1
34	13	2	1
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id) FROM stdin;
1	3
2	3
3	4
4	3
5	3
6	3
7	3
8	3
9	3
10	3
11	3
12	3
13	4
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, image_url, category) FROM stdin;
14	ТестТовар2	11111111	https://media.istockphoto.com/id/1165562559/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%82%D0%B0%D1%80%D1%83%D1%85%D0%B0-%D0%BD%D0%B0%D0%BB%D0%B8%D0%B2%D0%B0%D0%B5%D1%82-%D0%BA%D0%B0%D0%BF%D1%81%D1%83%D0%BB%D1%8B-%D1%80%D1%8B%D0%B1%D1%8C%D0%B5%D0%B3%D0%BE-%D0%B6%D0%B8%D1%80%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BC%D0%B0%D1%81%D0%BB%D0%B0-%D0%B8%D0%B7-%D0%B1%D1%83%D1%82%D1%8B%D0%BB%D0%BA%D0%B8-%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D1%8B%D0%BC-%D0%BF%D0%BB%D0%B0%D0%BD%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=UQRcYrnmFg2lBBqPP05DzavBfpqqkjP6DrBa3UPvuQk=	Витамины
1	Креатин	150000	https://media.istockphoto.com/id/2171236858/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BC%D0%B0%D0%BA%D0%B5%D1%82-%D0%B1%D0%B0%D0%BD%D0%BE%D1%87%D0%BA%D0%B8-%D1%81-%D0%BF%D0%BE%D1%80%D0%BE%D1%88%D0%BA%D0%BE%D0%BC-%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%BD%D0%B0-%D0%BF%D1%83%D1%81%D1%82%D0%B0%D1%8F-%D1%83%D0%BF%D0%B0%D0%BA%D0%BE%D0%B2%D0%BA%D0%B0-%D0%B4%D0%BB%D1%8F-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F-%D1%81.jpg?s=612x612&w=0&k=20&c=k5K1zNGt26R3I9z3Kf4F43FToh-dD686HQLQh2wqyIQ=	\N
2	Протеин	1000000	https://media.istockphoto.com/id/1391592981/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%BD%D1%8B%D0%B5-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B5-%D0%BF%D0%BB%D0%B0%D1%81%D1%82%D0%B8%D0%BA%D0%BE%D0%B2%D1%8B%D0%B5-%D0%B1%D1%83%D1%82%D1%8B%D0%BB%D0%BA%D0%B8-%D1%81-%D1%81%D1%8B%D0%B2%D0%BE%D1%80%D0%BE%D1%82%D0%BE%D1%87%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B1%D0%B5%D0%BB%D0%BA%D0%B0-%D1%81-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82%D0%BE%D0%BC-%D1%8D%D1%82%D0%B8%D0%BA%D0%B5%D1%82%D0%BA%D0%B8-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B9.jpg?s=612x612&w=0&k=20&c=IqThoCYLrlqOnN9yokGfwEQJZxf-AJUrgaBcEywLrw0=	\N
4	Test	123456	https://media.istockphoto.com/id/1309362812/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B5%D0%BB%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9-%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-%D0%B8-%D0%BF%D0%BE%D1%80%D0%BE%D1%88%D0%BE%D0%BA-%D1%84%D0%B8%D1%82%D0%BD%D0%B5%D1%81-%D0%B5%D0%B4%D0%B0-%D0%B8-%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BA%D0%B8-%D0%B4%D0%B8%D0%B5%D1%82%D0%B0.jpg?s=612x612&w=0&k=20&c=QzPQcC54QAB05Ppv1f66ngRtgAanHiwbI9Xxm-A_1jM=	\N
10	BCAA	200000	https://media.istockphoto.com/id/1473054128/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80-bcaa-%D1%81-%D0%B2%D1%8B%D1%81%D0%BE%D0%BA%D0%BE%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%BD%D1%8B%D0%BC-%D0%BE%D0%BF%D1%8B%D1%82%D0%BE%D0%BC.jpg?s=612x612&w=0&k=20&c=y8tFPN6SpUb9XYcn_s7ucPwKPeEmCG5q7JEPxgu5zpk=	\N
13	Whey Protein	350000	https://media.istockphoto.com/id/1174257563/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D1%81%D1%8B%D0%B2%D0%BE%D1%80%D0%BE%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BA-%D0%BF%D0%BB%D0%B0%D1%81%D1%82%D0%B8%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80-%D0%BC%D0%B0%D0%BA%D0%B5%D1%82-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%B0%D1%8F-%D0%B1%D1%83%D1%82%D1%8B%D0%BB%D0%BA%D0%B0.jpg?s=612x612&w=0&k=20&c=BMUIi3MzM3o_okmeT79jV7Y6G3k3UxFyxaiIrFtVWAs=	Протеины
11	BCAA 2:1:1	220000	https://media.istockphoto.com/id/613869834/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80-bcaa-%D0%BD%D0%B0%D0%B1%D0%BE%D1%80-%D1%80%D0%B0%D0%B7%D0%B2%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%B0%D0%BC%D0%B8%D0%BD%D0%BE%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D1%82.jpg?s=612x612&w=0&k=20&c=LfZlCu7OCuz63oWIqBi1H3km5htKiQaBE_qKbI0b6JQ=	BCAA
12	Creatine Monohydrate	180000	https://media.istockphoto.com/id/598795220/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%BD-%D0%B8-%D0%B2%D0%B8%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D0%BD%D1%8B%D0%B9-%D1%81%D0%BE%D0%BA.jpg?s=612x612&w=0&k=20&c=oAmzkfssXTTNdmwG7-Ijh1VX3q7sW7lX83IR8J55uIc=	Креатин
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role) FROM stdin;
1	JavaAdmin	$2b$12$BlXoTj3iJw3ZelulCgT8FOVpTWTCsQguFdNHcYUJ/cqVcs0qjpSKO	admin
2	test1	$2b$12$.IvTN1FPEa0PBf9ekUqFNeRGy6/vlMnRk1TNc5zWcrtDb2JgMkvrW	user
4	Customer1	$2b$12$rw08HJRRhJ7Lz10h3XLi7.YMTP29ogyrVgXCgFyv1y2Y0ZLm04Ofa	user
3	adminJava	$2b$12$jlo8QaZuu7L/m66wGrl3H.iJ5T9QUUNPhiUdCyDcRqpGO1S8.rO/u	admin
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 42, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 34, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 13, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_cart_items_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_cart_items_id ON public.cart_items USING btree (id);


--
-- Name: ix_order_items_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_order_items_id ON public.order_items USING btree (id);


--
-- Name: ix_orders_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_orders_id ON public.orders USING btree (id);


--
-- Name: ix_products_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_products_id ON public.products USING btree (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- PostgreSQL database dump complete
--

\unrestrict dBSP033F7w0BPVhMsiDfJpWmhYzp0T7KKiU0zVVI65ndzGq2KX49NYCwVMXTQ9r

