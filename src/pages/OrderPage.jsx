import '../styles/bootstrap-scoped.scss';
import { Form, Input, Button } from 'reactstrap';
import axios from 'axios';
import styles from './OrderPage.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ekMalzemelerListesi, pizzaBoyutlari } from '../data/data';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

const basePrice = 85.5;
const toppingPrice = 5;
const initialFormData = {
  isim: '',
  boyut: '',
  hamur: '',
  malzemeler: [],
  ozel: '',
  adet: 1,
};

export default function OrderPage({ setOrder }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const { isim, boyut, hamur, malzemeler, ozel, adet } = formData;

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      if (checked && malzemeler.length >= 10) return;
      setFormData({
        ...formData,
        malzemeler: checked
          ? [...malzemeler, value]
          : malzemeler.filter((malzeme) => malzeme !== value),
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (amount) => {
    setFormData({
      ...formData,
      adet: Math.max(1, adet + amount),
    });
  };

  const validate = (data) => {
    const errs = {};
    if (data.isim.trim().length > 0 && data.isim.trim().length < 3)
      errs.isim = 'İsim en az 3 karakter olmalı';
    if (data.malzemeler.length > 0 && data.malzemeler.length >= 10)
      errs.malzemeler = 'En fazla 10 malzeme seçebilirsiniz';
    if (data.malzemeler.length > 0 && data.malzemeler.length < 4)
      errs.malzemeler = 'En az 4 malzeme seçmelisiniz';
    return errs;
  };

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const isValid =
    formData.isim.trim().length >= 3 &&
    formData.malzemeler.length >= 4 &&
    formData.malzemeler.length <= 10 &&
    !!formData.boyut &&
    !!formData.hamur;

  const selectionsTotal = malzemeler.length * toppingPrice * adet;
  const total = (basePrice + malzemeler.length * toppingPrice) * adet;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    const confirmedOrder = {
      isim,
      boyut,
      hamur,
      malzemeler,
      ozel,
      adet,
      secimlerToplami: selectionsTotal,
      toplam: total,
    };
    try {
      const res = await axios.post(
        'https://reqres.in/api/pizza',
        confirmedOrder,
        {
          headers: {
            'x-api-key': 'free_user_3ImDFkN8gsAfvG3510FsNUwCMLL',
          },
        },
      );
      const data = res.data;
      console.log('Sipariş gönderildi:', data);
      setOrder(data);
      setFormData(initialFormData);
      navigate('/success');
    } catch (err) {
      console.error(err);
      setSubmitError(
        'Sipariş verilirken bir hata oluştu. Lütfen tekrar deneyin.',
      );
    }
  };

  return (
    <>
      <div className={styles.page}>
        <Header />
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderContent}>
            <div className={styles.bannerWrap}>
              <img src="../../images/iteration-2-images/pictures/form-banner.png" />
            </div>
            <nav className={styles.nav}>
              <Link to="/">Anasayfa</Link>
              <span>-</span>
              <Link to="/order" className={styles.active}>
                Sipariş Oluştur
              </Link>
            </nav>
            <h2 className={styles.productTitle}>Position Absolute Acı Pizza</h2>
            <div className={styles.priceRow}>
              <span className={styles.price}>85.50₺</span>
              <div className={styles.ratingGroup}>
                <span className={styles.rating}>4.9</span>
                <span className={styles.rating}>(200)</span>
              </div>
            </div>
            <p className={styles.description}>
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, penir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli bir yemektir. Küçük pizzaya bazen pizzetta denir.
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <Form onSubmit={handleSubmit} noValidate>
            <div className={styles.choiceRow}>
              <div className={styles.choiceGroup}>
                <span className={styles.choiceLabel}>
                  Boyut Seç<span className={styles.required}> *</span>
                </span>
                <div className={styles.sizeOptions}>
                  {pizzaBoyutlari.map((size) => (
                    <label
                      htmlFor="boyut"
                      key={size}
                      className={styles.sizeItem}
                    >
                      <Input
                        id="boyut"
                        type="radio"
                        name="boyut"
                        value={size}
                        checked={boyut === size}
                        onChange={handleChange}
                      />
                      <span className={styles.sizeText}>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.choiceGroup}>
                <label className={styles.choiceLabel} htmlFor="hamur">
                  Hamur Seç<span className={styles.required}> *</span>
                </label>
                <Input
                  id="hamur"
                  type="select"
                  name="hamur"
                  className={styles.select}
                  value={hamur}
                  onChange={handleChange}
                >
                  <option value="">--Hamur kalınlığı seç--</option>
                  <option>İnce</option>
                  <option>Orta</option>
                  <option>Kalın</option>
                </Input>
              </div>
            </div>

            <span className={styles.choiceLabel}>
              Ek Malzemeler<span className={styles.required}> * </span>
              <p className={styles.toppingHint}>
                En fazla 10 malzeme seçebilirsiniz. 5₺
              </p>
            </span>
            <div className={styles.toppingGrid}>
              {ekMalzemelerListesi.map((topping, index) => (
                <label
                  htmlFor="malzemeler"
                  key={index}
                  className={styles.toppingItem}
                >
                  <Input
                    id="malzemeler"
                    type="checkbox"
                    name="malzemeler"
                    value={topping}
                    checked={malzemeler.includes(topping)}
                    onChange={handleChange}
                    disabled={
                      !malzemeler.includes(topping) && malzemeler.length >= 10
                    }
                  />
                  {topping}
                </label>
              ))}
            </div>
            {errors.malzemeler && (
              <p data-cy="malzemeler-error" className={styles.error}>
                {errors.malzemeler}
              </p>
            )}

            <label className={styles.choiceLabel} htmlFor="isim">
              İsminiz<span className={styles.required}> *</span>
            </label>
            <Input
              id="isim"
              type="text"
              name="isim"
              className={styles.nameInput}
              placeholder="Adınızı giriniz"
              value={isim}
              onChange={handleChange}
            />
            {errors.isim && (
              <p data-cy="isim-error" className={styles.error}>
                {errors.isim}
              </p>
            )}

            <label className={styles.choiceLabel} htmlFor="ozel">
              Sipariş Notu
            </label>
            <Input
              id="ozel"
              type="textarea"
              name="ozel"
              className={styles.notesInput}
              placeholder="Siparişine eklenmesini istediğin bir not var mı?"
              value={ozel}
              onChange={handleChange}
            />

            <hr className={styles.divider} />

            <div className={styles.bottomRow}>
              <div className={styles.quantity}>
                <Button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={adet <= 1}
                  aria-label="Adet azalt"
                >
                  −
                </Button>
                <span className={styles.qtyValue}>{adet}</span>
                <Button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Adet artır"
                >
                  +
                </Button>
              </div>

              <div className={styles.summaryWrap}>
                <div className={styles.summary}>
                  <h3 className={styles.summaryTitle}>Sipariş Toplamı</h3>
                  <div className={styles.summaryRow}>
                    <span>Seçimler</span>
                    <span data-cy="selections-total">
                      {selectionsTotal.toFixed(2)}₺
                    </span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.total}`}>
                    <span>Toplam</span>
                    <span data-cy="total">{total.toFixed(2)}₺</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!isValid}
                  data-cy="submit-button"
                >
                  SİPARİŞ VER
                </Button>
                {submitError && (
                  <p data-cy="submit-error" className={styles.error}>
                    {submitError}
                  </p>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
