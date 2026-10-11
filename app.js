(() => {
  'use strict';

  const TABLES = ['employees', 'departments', 'positions', 'payrolls'];
  const TITLES = { dashboard: 'Dashboard', employees: 'Karyawan', departments: 'Departemen', positions: 'Jabatan', payrolls: 'Penggajian' };
  const DEFAULT_COMPANY_NAME = 'Perusahaan Mitra ArthaCore';
  const COMPANY_CHOICES = [
    { name: 'PT Pertamina (Persero)', displayName: 'Pertamina', brand: 'pertamina', font: "Arial, 'Segoe UI', sans-serif" },
    { name: 'PT Bank Central Asia Tbk (BCA)', displayName: 'BCA', brand: 'bca', font: 'Arial, sans-serif' },
    { name: 'PT Bank Mandiri (Persero) Tbk', displayName: 'Bank Mandiri', brand: 'mandiri', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT Bank Rakyat Indonesia (Persero) Tbk (BRI)', displayName: 'BRI', brand: 'bri', font: "Georgia, 'Times New Roman', serif" },
    { name: 'PT Telkom Indonesia (Persero) Tbk', displayName: 'Telkom Indonesia', brand: 'telkom', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT Astra International Tbk', displayName: 'Astra', brand: 'astra', font: 'Arial, sans-serif' },
    { name: 'PT PLN (Persero)', displayName: 'PLN', brand: 'pln', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT GoTo Gojek Tokopedia Tbk', displayName: 'GoTo', brand: 'goto', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT Indofood Sukses Makmur Tbk', displayName: 'Indofood', brand: 'indofood', font: "'Times New Roman', Georgia, serif" },
    { name: 'PT Unilever Indonesia Tbk', displayName: 'Unilever', brand: 'unilever', font: 'Arial, sans-serif' },
    { name: 'PT Kalbe Farma Tbk', displayName: 'Kalbe', brand: 'kalbe', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT Garuda Indonesia (Persero) Tbk', displayName: 'Garuda Indonesia', brand: 'garuda', font: "Georgia, 'Times New Roman', serif" },
    { name: 'PT Kereta Api Indonesia (Persero)', displayName: 'KAI', brand: 'kai', font: "'Segoe UI', Arial, sans-serif" },
    { name: 'PT Freeport Indonesia', displayName: 'Freeport Indonesia', brand: 'freeport', font: 'Arial, sans-serif' },
    { name: 'PT Tokopedia', displayName: 'Tokopedia', brand: 'tokopedia', font: "'Segoe UI', Arial, sans-serif" }
  ];
  const TER_BRACKETS = {
    A: [[5400000, 0], [5650000, .0025], [5950000, .005], [6300000, .0075], [6750000, .01], [7500000, .0125], [8550000, .015], [9650000, .0175], [10050000, .02], [10350000, .0225], [10700000, .025], [11050000, .03], [11600000, .035], [12500000, .04], [13750000, .05], [15100000, .06], [16950000, .07], [19750000, .08], [24150000, .09], [26450000, .10], [28000000, .11], [30050000, .12], [32400000, .13], [35400000, .14], [39100000, .15], [43850000, .16], [47800000, .17], [51400000, .18], [56300000, .19], [62200000, .20], [68600000, .21], [77500000, .22], [89000000, .23], [103000000, .24], [125000000, .25], [157000000, .26], [206000000, .27], [337000000, .28], [454000000, .29], [550000000, .30], [695000000, .31], [910000000, .32], [1400000000, .33], [Infinity, .34]],
    B: [[6200000, 0], [6500000, .0025], [6850000, .005], [7300000, .0075], [9200000, .01], [10750000, .015], [11250000, .02], [11600000, .025], [12600000, .03], [13600000, .04], [14950000, .05], [16400000, .06], [18450000, .07], [21850000, .08], [26000000, .09], [27700000, .10], [29350000, .11], [31450000, .12], [33950000, .13], [37100000, .14], [41100000, .15], [45800000, .16], [49500000, .17], [53800000, .18], [58500000, .19], [64000000, .20], [71000000, .21], [80000000, .22], [93000000, .23], [109000000, .24], [129000000, .25], [163000000, .26], [211000000, .27], [374000000, .28], [459000000, .29], [555000000, .30], [704000000, .31], [957000000, .32], [1405000000, .33], [Infinity, .34]],
    C: [[6600000, 0], [6950000, .0025], [7350000, .005], [7800000, .0075], [8850000, .01], [9800000, .0125], [10950000, .015], [11200000, .0175], [12050000, .02], [12950000, .03], [14150000, .04], [15550000, .05], [17050000, .06], [19500000, .07], [22700000, .08], [26600000, .09], [28100000, .10], [30100000, .11], [32600000, .12], [35400000, .13], [38900000, .14], [43000000, .15], [47400000, .16], [51200000, .17], [55800000, .18], [60400000, .19], [66700000, .20], [74500000, .21], [83200000, .22], [95600000, .23], [110000000, .24], [134000000, .25], [169000000, .26], [221000000, .27], [390000000, .28], [463000000, .29], [561000000, .30], [709000000, .31], [965000000, .32], [1419000000, .33], [Infinity, .34]]
  };
  const PTKP_AMOUNTS = { 'TK/0': 54000000, 'TK/1': 58500000, 'TK/2': 63000000, 'TK/3': 67500000, 'K/0': 58500000, 'K/1': 63000000, 'K/2': 67500000, 'K/3': 72000000 };
  const ARTICLE_17_RATES = [[60000000, .05], [250000000, .15], [500000000, .25], [5000000000, .30], [Infinity, .35]];
  const ANNUAL_FIELDS = new Set(['previous_gross_ytd', 'previous_pph21_ytd', 'previous_employee_pension_ytd', 'previous_periods_ytd']);
  const CONFIG_KEY = 'arthacore.supabase.config';
  const CUSTOM_COMPANY_VALUE = '__custom_company__';
  const state = { page: 'dashboard', records: { employees: [], departments: [], positions: [], payrolls: [] }, config: readConfig(), editing: null, search: Object.fromEntries(TABLES.map((key) => [key, ''])) };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const money = (value) => `Rp${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`;
  const date = (value) => value ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : '—';
  const initials = (name) => String(name || '?').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const field = (name, label, type = 'text', options = {}) => ({ name, label, type, ...options, money: options.money ?? label.includes('(Rp)') });

  function formatThousands(value) {
    const digits = String(value ?? '').replace(/\D/g, '');
    return digits ? new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Number(digits)) : '';
  }

  function parseInputNumber(input) {
    if (!input) return 0;
    const value = input.dataset.moneyInput === 'true' ? input.value.replace(/\D/g, '') : input.value;
    return Number(value) || 0;
  }

  function formatMoneyInput(input) {
    const digitCountBeforeCaret = input.value.slice(0, input.selectionStart ?? input.value.length).replace(/\D/g, '').length;
    const formatted = formatThousands(input.value);
    input.value = formatted;
    let caret = 0;
    let digitsSeen = 0;
    while (caret < formatted.length && digitsSeen < digitCountBeforeCaret) {
      if (/\d/.test(formatted[caret])) digitsSeen++;
      caret++;
    }
    input.setSelectionRange(caret, caret);
  }

  const SCHEMAS = {
    departments: {
      title: 'Departemen', singular: 'departemen', fields: [
        field('name', 'Nama departemen', 'text', { required: true }),
        field('code', 'Kode departemen', 'text', { required: true, placeholder: 'Contoh: FIN' }),
        field('manager_name', 'Kepala departemen'),
        field('location', 'Lokasi'),
        field('description', 'Deskripsi', 'textarea', { full: true })
      ]
    },
    positions: {
      title: 'Jabatan', singular: 'jabatan', fields: [
        field('title', 'Nama jabatan', 'text', { required: true }),
        field('grade', 'Grade', 'text', { placeholder: 'Contoh: L3' }),
        field('base_salary', 'Gaji pokok (Rp)', 'number', { required: true, min: 0, step: 100000 }),
        field('allowance', 'Tunjangan (Rp)', 'number', { min: 0, step: 100000 }),
        field('description', 'Deskripsi', 'textarea', { full: true })
      ]
    },
    employees: {
      title: 'Karyawan', singular: 'karyawan', fields: [
        field('employee_code', 'Kode karyawan', 'text', { required: true, placeholder: 'Contoh: EMP-001' }),
        field('full_name', 'Nama lengkap', 'text', { required: true }),
        field('company_name', 'Perusahaan', 'company', { full: true }),
        field('email', 'Email', 'email'),
        field('phone', 'Nomor telepon', 'tel'),
        field('department_id', 'Departemen', 'select', { relation: 'departments', relationLabel: 'name', emptyLabel: 'Pilih departemen' }),
        field('position_id', 'Jabatan', 'select', { relation: 'positions', relationLabel: 'title', emptyLabel: 'Pilih jabatan' }),
        field('work_province', 'Provinsi lokasi kerja'),
        field('minimum_wage', 'UMP/UMK berlaku (Rp)', 'number', { min: 0, step: 1000 }),
        field('join_date', 'Tanggal bergabung', 'date'),
        field('employment_status', 'Status karyawan', 'select', { options: [{ value: 'active', label: 'Aktif' }, { value: 'inactive', label: 'Tidak aktif' }, { value: 'on_leave', label: 'Cuti' }] })
      ]
    },
    payrolls: {
      title: 'Penggajian', singular: 'penggajian', fields: [
        field('employee_id', 'Karyawan', 'select', { required: true, relation: 'employees', relationLabel: 'full_name', emptyLabel: 'Pilih karyawan' }),
        field('period_start', 'Awal periode', 'date', { required: true }),
        field('period_end', 'Akhir periode', 'date', { required: true }),
        field('basic_salary', 'Gaji pokok bulanan (Rp)', 'number', { required: true, min: 0, step: 100000 }),
        field('allowance', 'Tunjangan tetap bulanan (Rp)', 'number', { min: 0, step: 100000 }),
        field('overtime_hours', 'Lembur hari kerja (jam)', 'number', { min: 0, step: 0.5, value: 0 }),
        field('bonus_amount', 'Bonus/pendapatan tidak tetap (Rp)', 'number', { min: 0, step: 100000 }),
        field('deductions', 'Potongan lain (Rp)', 'number', { min: 0, step: 100000 }),
        field('ptkp_status', 'Status PTKP', 'select', { options: [{ value: 'TK/0', label: 'TK/0 · Tidak kawin, 0 tanggungan' }, { value: 'TK/1', label: 'TK/1 · Tidak kawin, 1 tanggungan' }, { value: 'TK/2', label: 'TK/2 · Tidak kawin, 2 tanggungan' }, { value: 'TK/3', label: 'TK/3 · Tidak kawin, 3 tanggungan' }, { value: 'K/0', label: 'K/0 · Kawin, 0 tanggungan' }, { value: 'K/1', label: 'K/1 · Kawin, 1 tanggungan' }, { value: 'K/2', label: 'K/2 · Kawin, 2 tanggungan' }, { value: 'K/3', label: 'K/3 · Kawin, 3 tanggungan' }] }),
        field('pph21_method', 'Metode PPh 21', 'select', { options: [{ value: 'monthly_ter', label: 'Potongan bulanan · TER' }, { value: 'annual_reconciliation', label: 'Rekonsiliasi masa pajak terakhir' }] }),
        field('previous_gross_ytd', 'Bruto periode sebelumnya tahun ini (Rp)', 'number', { min: 0, step: 100000 }),
        field('previous_pph21_ytd', 'PPh 21 dipotong periode sebelumnya (Rp)', 'number', { min: 0, step: 1000 }),
        field('previous_employee_pension_ytd', 'JHT + JP karyawan periode sebelumnya (Rp)', 'number', { min: 0, step: 1000 }),
        field('previous_periods_ytd', 'Jumlah masa kerja/payroll terdahulu tahun ini', 'number', { min: 0, max: 11, step: 1, value: 11 }),
        field('jp_wage_cap', 'Batas atas upah JP (Rp)', 'number', { required: true, min: 0, step: 1000, value: 10547400 }),
        field('jkk_risk_rate', 'Kelas risiko JKK perusahaan', 'select', { options: [{ value: '0.0024', label: 'Sangat rendah · 0,24%' }, { value: '0.0054', label: 'Rendah · 0,54%' }, { value: '0.0089', label: 'Sedang · 0,89%' }, { value: '0.0127', label: 'Tinggi · 1,27%' }, { value: '0.0174', label: 'Sangat tinggi · 1,74%' }] }),
        field('status', 'Status pembayaran', 'select', { options: [{ value: 'draft', label: 'Draft' }, { value: 'pending', label: 'Menunggu pembayaran' }, { value: 'paid', label: 'Dibayarkan' }] }),
        { note: 'PPh 21 memakai TER bulanan sesuai PP 58/2023; masa pajak terakhir memakai tarif progresif Pasal 17 setelah biaya jabatan, JHT/JP karyawan, dan PTKP. Untuk rekonsiliasi, masukkan akumulasi bruto, pajak, dan iuran sebelum periode ini. Tarif iuran BPJS mengikuti skema PPU; konfirmasi plafon JP tahun berjalan dan kelayakan pajak kepada HR/pengelola pajak.' }
      ]
    }
  };

  function readConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      let stored = saved ? JSON.parse(saved) : null;
      if (!stored) {
        const legacy = sessionStorage.getItem(CONFIG_KEY);
        if (legacy) {
          stored = JSON.parse(legacy);
          localStorage.setItem(CONFIG_KEY, legacy);
          sessionStorage.removeItem(CONFIG_KEY);
        }
      }
      const deployment = window.ARTHACORE_CONFIG || {};
      const defaultUrl = String(deployment.supabaseUrl || '').trim().replace(/\/+$/, '');
      const defaultKey = String(deployment.publishableKey || '').trim();
      const defaultCompany = String(deployment.companyName || '').trim();
      if (defaultUrl || defaultKey || defaultCompany) {
        const companyName = defaultCompany || (defaultUrl && defaultKey ? DEFAULT_COMPANY_NAME : stored?.company_name);
        const resolved = {
          ...stored,
          ...(defaultUrl ? { url: defaultUrl } : {}),
          ...(defaultKey ? { key: defaultKey } : {}),
          ...(companyName ? { company_name: companyName } : {})
        };
        try {
          const serialized = JSON.stringify(resolved);
          if (saved !== serialized) localStorage.setItem(CONFIG_KEY, serialized);
        } catch (error) {
          console.warn('Konfigurasi Supabase bawaan tidak dapat disimpan di browser ini.', error);
        }
        return resolved;
      }
      return stored || {};
    }
    catch (error) { console.warn('Konfigurasi Supabase tersimpan tidak dapat dibaca.', error); return {}; }
  }

  function notify(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    $('#toast-region').append(toast);
    window.setTimeout(() => toast.remove(), 3600);
  }

  function setError(message) {
    const box = $('#modal-error');
    box.textContent = message;
    box.classList.toggle('visible', Boolean(message));
  }

  function apiUrl(table, query = '') {
    const root = String(state.config.url || '').replace(/\/+$/, '');
    return `${root}/rest/v1/${table}${query}`;
  }

  async function request(table, { method = 'GET', query = '', body, prefer } = {}) {
    if (!state.config.url || !state.config.key || !state.config.company_name) throw new Error('Pengaturan project perusahaan belum lengkap.');
    const headers = { apikey: state.config.key, Authorization: `Bearer ${state.config.key}`, Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (prefer) headers.Prefer = prefer;
    const response = await fetch(apiUrl(table, query), { method, headers, body: body === undefined ? undefined : JSON.stringify(body), cache: 'no-store' });
    if (!response.ok) {
      const detail = await response.text();
      let message = detail;
      try { message = JSON.parse(detail).message || JSON.parse(detail).hint || detail; } catch { /* Keep the original response text. */ }
      throw new Error(`Supabase (${response.status}): ${message}`);
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  function relationSelect(table) {
    return table === 'employees' ? '*,departments(name),positions(title,base_salary,allowance)' :
      table === 'departments' ? '*,employees(count)' :
        table === 'positions' ? '*,employees(count)' : '*,employees!inner(full_name,employee_code,company_name)';
  }

  async function loadData() {
    if (!state.config.url || !state.config.key || !state.config.company_name) {
      TABLES.forEach((table) => { state.records[table] = []; });
      render();
      return;
    }
    const companyFilter = encodeURIComponent(state.config.company_name);
    const results = await Promise.all(TABLES.map((table) => {
      const tenantFilter = table === 'employees' ? `&company_name=eq.${companyFilter}` :
        table === 'payrolls' ? `&employees.company_name=eq.${companyFilter}` : '';
      return request(table, { query: `?select=${encodeURIComponent(relationSelect(table))}&order=created_at.desc${tenantFilter}` });
    }));
    TABLES.forEach((table, index) => { state.records[table] = results[index] || []; });
    render();
  }

  function goTo(page) {
    if (!TITLES[page]) return;
    state.page = page;
    $$('.page-view').forEach((view) => view.classList.toggle('active', view.id === `page-${page}`));
    $$('.nav-link[data-page]').forEach((link) => link.classList.toggle('active', link.dataset.page === page));
    $('#breadcrumb-current').textContent = TITLES[page];
    $('#sidebar').classList.remove('open');
    if (location.hash !== `#${page}`) history.replaceState(null, '', `#${page}`);
    render();
  }

  function showSetup() {
    state.editing = { table: 'settings', id: null };
    openModal('Pengaturan perusahaan', 'Setiap perusahaan harus menggunakan project Supabase tersendiri. Masukkan identitas perusahaan dan kredensial project-nya.', [
      field('company_name', 'Pilih perusahaan untuk workspace ini', 'company_choice', { required: true, full: true, value: state.config.company_name || '' }),
      field('project_url', 'Project URL', 'url', { required: true, full: true, placeholder: 'https://xxxxxxxx.supabase.co', value: state.config.url || '' }),
      field('publishable_key', 'Publishable key', 'text', { required: true, full: true, placeholder: 'sb_publishable_...', value: state.config.key || '', autocomplete: 'off' }),
      { note: 'Konfigurasi project disimpan di browser ini. Aplikasi mengakses Supabase tanpa login menggunakan publishable key; pastikan kebijakan RLS hanya memberi akses yang memang boleh dibuka untuk publik. Jangan gunakan service-role/secret key.' }
    ]);
  }

  function openModal(title, description, fields, record = {}) {
    state.editing = state.editing || { table: null, id: null };
    $('#modal-title').textContent = title;
    $('#modal-description').textContent = description;
    setError('');
    const markup = fields.map((item) => {
      if (item.note) return `<p class="form-note">${escapeHtml(item.note)}</p>`;
      const value = record[item.name] ?? item.value ?? '';
      const required = item.required ? ' required' : '';
      const full = item.full ? ' full' : '';
      const annualOnly = ANNUAL_FIELDS.has(item.name) ? ' data-annual-only' : '';
      let control;
      if (item.type === 'company_choice') {
        const savedName = String(value || '');
        const preset = COMPANY_CHOICES.find((company) => company.name === savedName);
        const selection = savedName ? preset ? savedName : CUSTOM_COMPANY_VALUE : '';
        control = `<select id="field-company_name" name="company_name" required><option value="">Pilih perusahaan</option>${COMPANY_CHOICES.map((company) => `<option value="${escapeHtml(company.name)}" ${selection === company.name ? 'selected' : ''}>${escapeHtml(company.name)}</option>`).join('')}<option value="${CUSTOM_COMPANY_VALUE}" ${selection === CUSTOM_COMPANY_VALUE ? 'selected' : ''}>Perusahaan lain / masukkan nama sendiri</option></select><input id="field-company-custom" name="company_name_custom" value="${preset || !savedName ? '' : escapeHtml(savedName)}" type="text" placeholder="Masukkan nama resmi perusahaan" ${selection !== CUSTOM_COMPANY_VALUE ? 'hidden' : ''} ${selection === CUSTOM_COMPANY_VALUE ? 'required' : ''}>`;
      } else if (item.type === 'company') {
        control = `<input id="field-company_name" type="text" value="${escapeHtml(state.config.company_name || DEFAULT_COMPANY_NAME)}" readonly aria-readonly="true">`;
      } else if (item.type === 'select') {
        const choices = item.relation
          ? (state.records[item.relation] || []).map((option) => `<option value="${escapeHtml(option.id)}" ${String(value) === String(option.id) ? 'selected' : ''}>${escapeHtml(option[item.relationLabel])}</option>`).join('')
          : (item.options || []).map((option) => `<option value="${escapeHtml(option.value)}" ${String(value || item.options?.[0]?.value) === String(option.value) ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('');
        control = `<select id="field-${item.name}" name="${item.name}"${required}><option value="">${escapeHtml(item.emptyLabel || 'Pilih opsi')}</option>${choices}</select>`;
      } else if (item.type === 'textarea') {
        control = `<textarea id="field-${item.name}" name="${item.name}" placeholder="${escapeHtml(item.placeholder || '')}"${required}>${escapeHtml(value)}</textarea>`;
      } else {
        const inputType = item.money ? 'text' : item.type || 'text';
        const inputValue = item.money ? formatThousands(value) : value;
        const moneyAttributes = item.money ? ' inputmode="numeric" autocomplete="off" data-money-input="true"' : '';
        control = `<input id="field-${item.name}" name="${item.name}" type="${inputType}" value="${escapeHtml(inputValue)}" placeholder="${escapeHtml(item.placeholder || '')}"${item.money ? '' : item.min !== undefined ? ` min="${item.min}"` : ''}${item.money ? '' : item.max !== undefined ? ` max="${item.max}"` : ''}${item.money ? '' : item.step ? ` step="${item.step}"` : ''}${required}${item.autocomplete ? ` autocomplete="${item.autocomplete}"` : moneyAttributes}>`;
      }
      return `<div class="form-field${full}"${annualOnly}><label for="field-${item.name}">${escapeHtml(item.label)}${item.required ? ' <span class="required-mark">*</span>' : ''}</label>${control}</div>`;
    }).join('');
    $('#modal-fields').innerHTML = markup;
    $$('[data-money-input]').forEach((input) => input.addEventListener('input', () => formatMoneyInput(input)));
    const companyChoice = $('#field-company_name');
    if (companyChoice?.tagName === 'SELECT') {
      companyChoice.addEventListener('change', () => {
        const customInput = $('#field-company-custom');
        const isCustom = companyChoice.value === CUSTOM_COMPANY_VALUE;
        customInput.hidden = !isCustom;
        customInput.required = isCustom;
        if (isCustom) customInput.focus();
      });
    }
    if (state.editing.table === 'payrolls') {
      $('#modal-fields').insertAdjacentHTML('beforeend', '<section class="payroll-calculation-preview full" id="payroll-calculation-preview" aria-live="polite"></section>');
      $$('#modal-fields input, #modal-fields select').forEach((input) => {
        input.addEventListener('input', renderPayrollCalculation);
        input.addEventListener('change', (event) => {
          if (event.target.id === 'field-pph21_method') toggleAnnualFields();
          else renderPayrollCalculation();
        });
      });
      toggleAnnualFields();
    }
    $('#save-modal').textContent = state.editing.table === 'settings' ? 'Simpan pengaturan' : 'Simpan data';
    $('.modal-close').hidden = false;
    $('#cancel-modal').hidden = false;
    $('#modal-backdrop').classList.add('open');
    $('#modal-backdrop').setAttribute('aria-hidden', 'false');
    const first = $('#modal-fields input, #modal-fields select');
    if (first) window.setTimeout(() => first.focus(), 50);
  }

  function closeModal() {
    $('#modal-backdrop').classList.remove('open');
    $('#modal-backdrop').setAttribute('aria-hidden', 'true');
    state.editing = null;
  }

  function createRecord(table) {
    if (table === 'settings') return showSetup();
    if (!state.config.url || !state.config.key || !state.config.company_name) { showSetup(); return; }
    if (table === 'payrolls' && !state.records.employees.length) { notify('Tambahkan data karyawan sebelum membuat penggajian.', 'error'); return; }
    if (table === 'employees' && (!state.records.departments.length || !state.records.positions.length)) {
      notify('Lengkapi master departemen dan jabatan terlebih dahulu.', 'error'); return;
    }
    state.editing = { table, id: null };
    openModal(`Tambah ${SCHEMAS[table].singular}`, `Isi informasi ${SCHEMAS[table].singular} pada formulir berikut.`, SCHEMAS[table].fields, table === 'payrolls' ? { period_start: currentMonthStart(), period_end: currentMonthEnd(), status: 'pending', basic_salary: 0, allowance: 0, overtime_hours: 0, bonus_amount: 0, deductions: 0, jp_wage_cap: 10547400, jkk_risk_rate: 0.0024, previous_periods_ytd: 11 } : {});
    if (table === 'payrolls') $('#field-employee_id').addEventListener('change', (event) => applyEmployeeSalary(event.target.value));
  }

  function editRecord(table, id) {
    if (table === 'settings') return showSetup();
    const record = state.records[table].find((item) => item.id === id);
    if (!record) return;
    state.editing = { table, id };
    openModal(`Ubah ${SCHEMAS[table].singular}`, `Perbarui informasi ${SCHEMAS[table].singular}.`, SCHEMAS[table].fields, record);
    if (table === 'payrolls') $('#field-employee_id').addEventListener('change', (event) => applyEmployeeSalary(event.target.value));
  }

  function applyEmployeeSalary(employeeId) {
    const employee = state.records.employees.find((item) => item.id === employeeId);
    if (!employee) return;
    const position = state.records.positions.find((item) => item.id === employee.position_id);
    const basic = Number(position?.base_salary || employee.base_salary || 0);
    const allowance = Number(position?.allowance || 0);
    if ($('#field-basic_salary')) $('#field-basic_salary').value = formatThousands(basic);
    if ($('#field-allowance')) $('#field-allowance').value = formatThousands(allowance);
    renderPayrollCalculation();
  }

  function taxCategory(status) {
    if (['K/3'].includes(status)) return 'C';
    if (['TK/2', 'TK/3', 'K/1', 'K/2'].includes(status)) return 'B';
    return 'A';
  }

  function terRate(monthlyTaxableGross, status) {
    const brackets = TER_BRACKETS[taxCategory(status)];
    return brackets.find(([ceiling]) => monthlyTaxableGross <= ceiling)?.[1] ?? brackets[brackets.length - 1][1];
  }

  function progressiveIncomeTax(annualTaxableIncome) {
    let remaining = Math.max(0, Math.floor(annualTaxableIncome / 1000) * 1000);
    let lowerLimit = 0;
    let tax = 0;
    for (const [ceiling, rate] of ARTICLE_17_RATES) {
      const taxableInBand = Math.max(0, Math.min(remaining, ceiling - lowerLimit));
      tax += taxableInBand * rate;
      if (remaining <= ceiling - lowerLimit) break;
      remaining -= ceiling - lowerLimit;
      lowerLimit = ceiling;
    }
    return Math.round(tax);
  }

  function payrollInputs() {
    const number = (name) => Math.max(0, parseInputNumber($(`#field-${name}`)));
    const employeeId = $('#field-employee_id')?.value;
    const employee = state.records.employees.find((item) => item.id === employeeId);
    const basicSalary = number('basic_salary');
    const allowance = number('allowance');
    const fixedWage = basicSalary + allowance;
    const overtimeHours = number('overtime_hours');
    const overtimeHourRate = fixedWage / 173;
    const overtimeAmount = Math.round(overtimeHourRate * (Math.min(1, overtimeHours) * 1.5 + Math.max(0, overtimeHours - 1) * 2));
    const bonusAmount = number('bonus_amount');
    const grossCash = fixedWage + overtimeAmount + bonusAmount;
    const minimumWage = Number(employee?.minimum_wage) || 0;
    const bpjsWageBase = Math.max(fixedWage, minimumWage);
    const healthBase = Math.min(bpjsWageBase, 12000000);
    const jpCap = number('jp_wage_cap');
    const jpBase = Math.min(bpjsWageBase, jpCap);
    const jkkRiskRate = Number($('#field-jkk_risk_rate')?.value || 0.0024);
    const contributions = {
      bpjs_kesehatan_employee: Math.round(healthBase * 0.01),
      bpjs_kesehatan_employer: Math.round(healthBase * 0.04),
      bpjs_jht_employee: Math.round(bpjsWageBase * 0.02),
      bpjs_jht_employer: Math.round(bpjsWageBase * 0.037),
      bpjs_jp_employee: Math.round(jpBase * 0.01),
      bpjs_jp_employer: Math.round(jpBase * 0.02),
      bpjs_jkk_employer: Math.round(bpjsWageBase * jkkRiskRate),
      bpjs_jkm_employer: Math.round(bpjsWageBase * 0.003)
    };
    const taxableGross = grossCash + contributions.bpjs_kesehatan_employer + contributions.bpjs_jkk_employer + contributions.bpjs_jkm_employer;
    const ptkpStatus = $('#field-ptkp_status')?.value || 'TK/0';
    const method = $('#field-pph21_method')?.value || 'monthly_ter';
    const rate = terRate(taxableGross, ptkpStatus);
    let pph21;
    if (method === 'annual_reconciliation') {
      const previousGross = number('previous_gross_ytd') + taxableGross;
      const months = Math.min(12, number('previous_periods_ytd') + 1);
      const jobExpense = Math.min(previousGross * 0.05, months * 500000, 6000000);
      const pensionContribution = number('previous_employee_pension_ytd') + contributions.bpjs_jht_employee + contributions.bpjs_jp_employee;
      const annualNet = Math.max(0, previousGross - jobExpense - pensionContribution);
      const annualTaxableIncome = Math.max(0, annualNet - (PTKP_AMOUNTS[ptkpStatus] || PTKP_AMOUNTS['TK/0']));
      pph21 = progressiveIncomeTax(annualTaxableIncome) - number('previous_pph21_ytd');
    } else {
      pph21 = Math.round(taxableGross * rate);
    }
    const employerTotal = contributions.bpjs_kesehatan_employer + contributions.bpjs_jht_employer + contributions.bpjs_jp_employer + contributions.bpjs_jkk_employer + contributions.bpjs_jkm_employer;
    const deductions = number('deductions');
    const takeHomePay = grossCash - pph21 - contributions.bpjs_kesehatan_employee - contributions.bpjs_jht_employee - contributions.bpjs_jp_employee - deductions;
    return { employee, basicSalary, allowance, fixedWage, overtimeHours, overtimeAmount, bonusAmount, grossCash, minimumWage, bpjsWageBase, taxableGross, ptkpStatus, method, rate, pph21, contributions, employerTotal, deductions, takeHomePay, jpCap, jkkRiskRate, previousGross: number('previous_gross_ytd'), previousPph21: number('previous_pph21_ytd'), previousEmployeePension: number('previous_employee_pension_ytd'), previousPeriods: number('previous_periods_ytd') };
  }

  function renderPayrollCalculation() {
    const preview = $('#payroll-calculation-preview');
    if (!preview) return;
    const totals = payrollInputs();
    const category = taxCategory(totals.ptkpStatus);
    const rateLabel = `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(totals.rate * 100)}%`;
    const taxMethodLabel = totals.method === 'annual_reconciliation' ? 'Pasal 17 · rekonsiliasi tahunan' : `TER Kategori ${category} · ${rateLabel}`;
    const minimumWageWarning = totals.minimumWage > 0 && totals.fixedWage < totals.minimumWage
      ? `<div class="calculation-warning">Gaji pokok + tunjangan tetap di bawah UMK/UMP tersimpan (${escapeHtml(money(totals.minimumWage))}). Periksa kepatuhan upah minimum sebelum payroll diproses.</div>`
      : '';
    const annualWarning = totals.method === 'annual_reconciliation'
      ? '<div class="calculation-warning">Pastikan bruto, PPh 21, iuran JHT/JP, dan jumlah masa sebelumnya diisi sebagai akumulasi aktual tahun pajak ini. Bruto sebelumnya juga mencakup BPJS pemberi kerja yang menjadi objek pajak.</div>'
      : '';
    preview.innerHTML = `<div class="calculation-heading"><span>RINGKASAN PERHITUNGAN INDONESIA</span><span>${totals.employee?.work_province ? escapeHtml(totals.employee.work_province) : 'BPJS PPU'}</span></div><div class="calculation-breakdown"><span>Gaji pokok + tunjangan tetap</span><strong>${escapeHtml(money(totals.fixedWage))}</strong><span>Lembur hari kerja · ${escapeHtml(totals.overtimeHours)} jam</span><strong>${escapeHtml(money(totals.overtimeAmount))}</strong><span>Bonus/pendapatan tidak tetap</span><strong>${escapeHtml(money(totals.bonusAmount))}</strong><span>Bruto tunai</span><strong>${escapeHtml(money(totals.grossCash))}</strong><span>PPh 21 · ${escapeHtml(taxMethodLabel)}</span><strong>${escapeHtml(money(totals.pph21))}</strong><span>BPJS Kesehatan + JHT + JP karyawan</span><strong>${escapeHtml(money(totals.contributions.bpjs_kesehatan_employee + totals.contributions.bpjs_jht_employee + totals.contributions.bpjs_jp_employee))}</strong><span>Potongan lain</span><strong>${escapeHtml(money(totals.deductions))}</strong></div><div class="calculation-take-home"><span>ESTIMASI GAJI BERSIH</span><strong>${escapeHtml(money(totals.takeHomePay))}</strong></div><div class="calculation-employer"><span>Iuran BPJS pemberi kerja · tidak memotong take-home pay</span><strong>${escapeHtml(money(totals.employerTotal))}</strong></div>${minimumWageWarning}${annualWarning}<p class="calculation-footnote">Dasar BPJS = upah pokok + tunjangan tetap (dengan UMP/UMK yang diisi); kesehatan dibatasi Rp12 juta/bulan, JP memakai plafon yang diinput. Lembur memakai 1,5× jam pertama dan 2× jam selanjutnya (hari kerja biasa). Validasi HR/pengelola pajak tetap diperlukan.</p>`;
  }

  function toggleAnnualFields() {
    const annual = $('#field-pph21_method')?.value === 'annual_reconciliation';
    ANNUAL_FIELDS.forEach((name) => {
      const input = $(`#field-${name}`);
      if (!input) return;
      input.closest('.form-field').hidden = !annual;
      input.required = annual;
    });
    renderPayrollCalculation();
  }

  function localDateString(value) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  }
  function currentMonthStart() { const d = new Date(); return localDateString(new Date(d.getFullYear(), d.getMonth(), 1)); }
  function currentMonthEnd() { const d = new Date(); return localDateString(new Date(d.getFullYear(), d.getMonth() + 1, 0)); }

  function formPayload(form) {
    const { id, table } = state.editing || {};
    const data = new FormData(form);
    const payload = {};
    for (const [key, value] of data.entries()) {
      const input = form.elements.namedItem(key);
      const isNumeric = input?.type === 'number' || input?.dataset.moneyInput === 'true';
      if (value === '') { payload[key] = table === 'payrolls' && isNumeric ? 0 : null; continue; }
      payload[key] = input?.dataset.moneyInput === 'true' ? parseInputNumber(input) : input?.type === 'number' ? Number(value) : value;
    }
    if (table === 'employees') {
      payload.company_name = state.config.company_name;
      if (payload.employment_status === undefined) payload.employment_status = 'active';
    }
    if (table === 'payrolls') {
      const totals = payrollInputs();
      if (!totals.employee) throw new Error('Pilih karyawan yang valid sebelum menghitung penggajian.');
      if (totals.takeHomePay < 0) throw new Error('Total potongan melebihi pendapatan bruto. Periksa kembali komponen gaji dan potongan.');
      payload.overtime_hours = totals.overtimeHours;
      payload.overtime_amount = totals.overtimeAmount;
      payload.bonus_amount = totals.bonusAmount;
      payload.ptkp_status = totals.ptkpStatus;
      payload.pph21_method = totals.method;
      payload.pph21_ter_rate = totals.method === 'monthly_ter' ? totals.rate : 0;
      payload.pph21 = totals.pph21;
      payload.bpjs_kesehatan_employee = totals.contributions.bpjs_kesehatan_employee;
      payload.bpjs_kesehatan_employer = totals.contributions.bpjs_kesehatan_employer;
      payload.bpjs_jht_employee = totals.contributions.bpjs_jht_employee;
      payload.bpjs_jht_employer = totals.contributions.bpjs_jht_employer;
      payload.bpjs_jp_employee = totals.contributions.bpjs_jp_employee;
      payload.bpjs_jp_employer = totals.contributions.bpjs_jp_employer;
      payload.bpjs_jkk_employer = totals.contributions.bpjs_jkk_employer;
      payload.bpjs_jkm_employer = totals.contributions.bpjs_jkm_employer;
      payload.jp_wage_cap = totals.jpCap;
      payload.jkk_risk_rate = totals.jkkRiskRate;
      const existingPayroll = id ? state.records.payrolls.find((item) => item.id === id) : null;
      if (payload.status === 'paid') payload.paid_at = existingPayroll?.paid_at || new Date().toISOString();
      else payload.paid_at = null;
    }
    return payload;
  }

  async function saveForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const { table, id } = state.editing || {};
    if (table === 'settings') {
      const data = new FormData(form);
      const url = String(data.get('project_url') || '').trim().replace(/\/+$/, '');
      const key = String(data.get('publishable_key') || '').trim();
      const selectedCompany = String(data.get('company_name') || '').trim();
      const companyName = selectedCompany === CUSTOM_COMPANY_VALUE
        ? String(data.get('company_name_custom') || '').trim()
        : selectedCompany;
      if (!/^https:\/\/[a-zA-Z0-9-]+\.supabase\.co$/.test(url)) { setError('Project URL harus menggunakan format https://<project-ref>.supabase.co.'); return; }
      if (!key.startsWith('sb_publishable_')) { setError('Masukkan Publishable key Supabase dengan format sb_publishable_... dari pengaturan API project.'); return; }
      if (!companyName) { setError('Masukkan nama resmi perusahaan untuk workspace ini.'); return; }
      const nextConfig = { url, key, company_name: companyName };
      try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(nextConfig));
        sessionStorage.removeItem(CONFIG_KEY);
      } catch (error) {
        setError(`Konfigurasi tidak dapat disimpan di browser ini: ${error.message}`);
        return;
      }
      state.config = nextConfig;
      renderCompanyIdentity();
      closeModal();
      try {
        await loadData();
        notify('Project perusahaan berhasil disimpan.');
      }
      catch (error) { notify(error.message, 'error'); }
      return;
    }
    const saveButton = $('#save-modal');
    saveButton.disabled = true;
    saveButton.textContent = 'Menyimpan...';
    setError('');
    try {
      const payload = formPayload(form);
      if (id) await request(table, { method: 'PATCH', query: `?id=eq.${encodeURIComponent(id)}`, body: payload });
      else await request(table, { method: 'POST', body: payload, prefer: 'return=minimal' });
      closeModal();
      await loadData();
      notify(id ? 'Perubahan berhasil disimpan.' : `${SCHEMAS[table].title} berhasil ditambahkan.`);
    } catch (error) {
      setError(error.message);
    } finally {
      saveButton.disabled = false;
      saveButton.textContent = id ? 'Simpan data' : 'Simpan data';
    }
  }

  async function deleteRecord(table, id) {
    const record = state.records[table].find((item) => item.id === id);
    if (!record || !window.confirm(`Hapus ${SCHEMAS[table].singular} "${record.full_name || record.name || record.title || record.employee_code || ''}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      await request(table, { method: 'DELETE', query: `?id=eq.${encodeURIComponent(id)}` });
      await loadData();
      notify(`${SCHEMAS[table].title} berhasil dihapus.`);
    } catch (error) { notify(error.message, 'error'); }
  }

  function terbilang(amount) {
    const units = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
    const words = (number) => {
      if (number < 12) return units[number];
      if (number < 20) return number === 11 ? 'sebelas' : `${units[number - 10]} belas`;
      if (number < 100) return `${words(Math.floor(number / 10))} puluh${number % 10 ? ` ${words(number % 10)}` : ''}`;
      if (number < 200) return `seratus${number % 100 ? ` ${words(number % 100)}` : ''}`;
      if (number < 1000) return `${words(Math.floor(number / 100))} ratus${number % 100 ? ` ${words(number % 100)}` : ''}`;
      if (number < 2000) return `seribu${number % 1000 ? ` ${words(number % 1000)}` : ''}`;
      for (const [size, label] of [[1e12, 'triliun'], [1e9, 'miliar'], [1e6, 'juta'], [1e3, 'ribu']]) {
        if (number >= size) {
          const quotient = Math.floor(number / size);
          const remainder = number % size;
          return `${words(quotient)} ${label}${remainder ? ` ${words(remainder)}` : ''}`;
        }
      }
      return String(number);
    };
    const roundedAmount = Math.max(0, Math.round(Number(amount) || 0));
    return `${words(roundedAmount)} rupiah`;
  }

  function longDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
  }

  function companyMarkup() {
    const wordmarks = COMPANY_CHOICES.map((company) => {
      const label = escapeHtml(company.displayName);
      const fontFamily = escapeHtml(company.font);
      return `<span class="company-wordmark"><strong class="brand-${company.brand}" style="--company-font:${fontFamily}" title="${escapeHtml(company.name)}">${label}</strong></span>`;
    }).join('');
    return `<div class="company-loop">${wordmarks}</div><div class="company-loop" aria-hidden="true">${wordmarks}</div>`;
  }

  function renderCompanyIdentity() {
    const name = state.config.company_name || 'Nama Perusahaan';
    const track = $('#company-track');
    if (track) {
      track.innerHTML = companyMarkup();
    }
    const workspaceName = $('#workspace-company');
    if (workspaceName) workspaceName.textContent = name;
  }

  function printPayslip(id) {
    const record = state.records.payrolls.find((item) => item.id === id);
    if (!record) { notify('Data penggajian tidak ditemukan.', 'error'); return; }
    const employee = state.records.employees.find((item) => item.id === record.employee_id) || record.employees || {};
    const companyName = employee.company_name || DEFAULT_COMPANY_NAME;
    const overtime = Number(record.overtime_amount || 0);
    const bonus = Number(record.bonus_amount || 0);
    const grossPay = Number(record.basic_salary || 0) + Number(record.allowance || 0) + overtime + bonus;
    const employeeContributions = [
      ['BPJS Kesehatan (karyawan)', record.bpjs_kesehatan_employee],
      ['JHT (karyawan)', record.bpjs_jht_employee],
      ['JP (karyawan)', record.bpjs_jp_employee]
    ].filter(([, amount]) => Number(amount) > 0);
    const otherDeductions = Number(record.deductions || 0);
    const tax = Number(record.pph21 || 0);
    const deduction = employeeContributions.reduce((sum, [, amount]) => sum + Number(amount), 0) + otherDeductions + tax;
    const netPay = Number(record.net_salary ?? (grossPay - deduction));
    const employerContributions = [
      ['BPJS Kesehatan (pemberi kerja)', record.bpjs_kesehatan_employer],
      ['JHT (pemberi kerja)', record.bpjs_jht_employer],
      ['JP (pemberi kerja)', record.bpjs_jp_employer],
      ['JKK (pemberi kerja)', record.bpjs_jkk_employer],
      ['JKM (pemberi kerja)', record.bpjs_jkm_employer]
    ].filter(([, amount]) => Number(amount) > 0);
    const employerTotal = employerContributions.reduce((sum, [, amount]) => sum + Number(amount), 0);
    const employeeCode = employee.employee_code || 'TANPA-KODE';
    const periodCode = String(record.period_start || '').replace(/-/g, '').slice(0, 6) || 'TANPA-PERIODE';
    const reference = `AC/${periodCode}/${employeeCode}/${String(record.id || '').slice(0, 8).toUpperCase()}`;
    const statuses = { draft: 'Draft', pending: 'Menunggu pembayaran', paid: 'Dibayarkan' };
    const paymentStatus = statuses[record.status] || 'Tidak diketahui';
    const paidDate = record.paid_at ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(record.paid_at)) : '';
    const issueDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    const period = `${longDate(record.period_start)} – ${longDate(record.period_end)}`;
    const printRoot = $('#payslip-print');

    printRoot.innerHTML = `
      <article class="payslip-document">
        <header class="payslip-header">
          <div class="payslip-brand">
            <img class="payslip-mark" src="./assets/arthacore-mark.svg" alt="">
            <div><h1>${escapeHtml(companyName)}</h1><p>ArthaCore · Enterprise Payroll System</p></div>
          </div>
          <span class="payslip-confidential">DOKUMEN RAHASIA</span>
        </header>
        <div class="payslip-heading">
          <div><span>ADMINISTRASI PENGGAJIAN</span><h2>SLIP GAJI KARYAWAN</h2></div>
          <div class="payslip-reference"><span>Nomor slip</span><strong>${escapeHtml(reference)}</strong></div>
        </div>
        <div class="payslip-period"><span>Periode penggajian</span><strong>${escapeHtml(period)}</strong></div>
        <section class="payslip-section">
          <h3>IDENTITAS KARYAWAN</h3>
          <dl class="payslip-identity">
            <div><dt>Nama lengkap</dt><dd>${escapeHtml(employee.full_name || '—')}</dd></div>
            <div><dt>ID karyawan</dt><dd>${escapeHtml(employeeCode)}</dd></div>
            <div><dt>Departemen</dt><dd>${escapeHtml(employee.departments?.name || '—')}</dd></div>
            <div><dt>Jabatan</dt><dd>${escapeHtml(employee.positions?.title || '—')}</dd></div>
            <div><dt>Tanggal bergabung</dt><dd>${escapeHtml(longDate(employee.join_date))}</dd></div>
            <div><dt>Status pembayaran</dt><dd>${escapeHtml(paymentStatus)}${paidDate ? ` · ${escapeHtml(paidDate)}` : ''}</dd></div>
          </dl>
        </section>
        <section class="payslip-section payslip-earnings">
          <h3>RINCIAN PENDAPATAN</h3>
          <table class="payslip-table"><thead><tr><th>Komponen pendapatan</th><th>Jumlah</th></tr></thead><tbody>
            <tr><td>Gaji pokok</td><td>${escapeHtml(money(record.basic_salary))}</td></tr>
            <tr><td>Tunjangan tetap</td><td>${escapeHtml(money(record.allowance))}</td></tr>
            <tr><td>Lembur hari kerja (${escapeHtml(record.overtime_hours || 0)} jam)</td><td>${escapeHtml(money(overtime))}</td></tr>
            <tr><td>Bonus/pendapatan tidak tetap</td><td>${escapeHtml(money(bonus))}</td></tr>
            <tr class="payslip-subtotal"><td>Total pendapatan bruto</td><td>${escapeHtml(money(grossPay))}</td></tr>
          </tbody></table>
        </section>
        <section class="payslip-section">
          <h3>RINCIAN POTONGAN</h3>
          <table class="payslip-table"><tbody>
            ${tax !== 0 ? `<tr><td>${tax < 0 ? 'Pengembalian/kelebihan PPh 21' : 'PPh 21'} (${record.pph21_method === 'annual_reconciliation' ? 'rekonsiliasi tahunan' : `TER ${(Number(record.pph21_ter_rate || 0) * 100).toLocaleString('id-ID')}%`})</td><td>${escapeHtml(money(tax))}</td></tr>` : ''}
            ${employeeContributions.map(([label, amount]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(money(amount))}</td></tr>`).join('')}
            <tr><td>Potongan lainnya</td><td>${escapeHtml(money(otherDeductions))}</td></tr>
            <tr class="payslip-subtotal"><td>Total potongan</td><td>${escapeHtml(money(deduction))}</td></tr>
          </tbody></table>
        </section>
        <section class="payslip-net">
          <div><span>${record.status === 'paid' ? 'GAJI BERSIH DITERIMA' : 'GAJI BERSIH'}</span><small>${escapeHtml(terbilang(netPay))}</small></div>
          <strong>${escapeHtml(money(netPay))}</strong>
        </section>
        ${employerContributions.length ? `<section class="payslip-section"><h3>IURAN BPJS PEMBERI KERJA (TIDAK MEMOTONG GAJI)</h3><table class="payslip-table"><tbody>${employerContributions.map(([label, amount]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(money(amount))}</td></tr>`).join('')}<tr class="payslip-subtotal"><td>Total iuran pemberi kerja</td><td>${escapeHtml(money(employerTotal))}</td></tr></tbody></table></section>` : ''}
        <p class="payslip-note">Slip gaji ini memuat rincian penghasilan untuk periode yang tercantum dan bersifat rahasia. Mohon simpan dokumen ini sebagai arsip pribadi.</p>
        <section class="payslip-signatures" aria-label="Kolom tanda tangan">
          <div><span>Disiapkan oleh,</span><div></div><strong>HR &amp; Finance · ${escapeHtml(companyName)}</strong></div>
          <div><span>Diterima oleh,</span><div></div><strong>${escapeHtml(employee.full_name || 'Karyawan')}</strong></div>
        </section>
        <footer class="payslip-footer"><span>${escapeHtml(companyName)} · ArthaCore</span><span>Dicetak pada ${escapeHtml(issueDate)}</span></footer>
      </article>`;

    const originalTitle = document.title;
    const printableName = String(employee.full_name || 'Karyawan').replace(/[^\p{L}\p{N}-]+/gu, '-').replace(/^-|-$/g, '') || 'Karyawan';
    let fallbackTimer;
    const cleanup = () => {
      window.removeEventListener('afterprint', cleanup);
      window.clearTimeout(fallbackTimer);
      document.body.classList.remove('printing-payslip');
      document.title = originalTitle;
      printRoot.replaceChildren();
    };
    fallbackTimer = window.setTimeout(cleanup, 120000);
    window.addEventListener('afterprint', cleanup, { once: true });
    document.body.classList.add('printing-payslip');
    document.title = `Slip Gaji - ${printableName} - ${periodCode}`;
    try { window.print(); }
    catch (error) { cleanup(); notify(`Gagal membuka dialog cetak: ${error.message}`, 'error'); }
  }

  function render() {
    renderDashboard();
    renderEmployees();
    renderDepartments();
    renderPositions();
    renderPayrolls();
  }

  function setTableBody(table, html) { $(`#${table}-table`).innerHTML = html; }
  function emptyRow(columns, message) { return `<tr><td class="empty-state" colspan="${columns}"><span class="empty-icon">◌</span>${escapeHtml(message)}</td></tr>`; }
  function searchable(records, table, text) {
    const query = (state.search[table] || '').trim().toLocaleLowerCase('id');
    return query ? records.filter((record) => text(record).toLocaleLowerCase('id').includes(query)) : records;
  }
  function actions(table, id) { return `<div class="row-actions">${table === 'payrolls' ? `<button class="row-action print-action" type="button" data-print="${escapeHtml(id)}" aria-label="Cetak slip gaji" title="Cetak slip gaji"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/><path d="M17 11h.01"/></svg></button>` : ''}<button class="row-action" type="button" data-edit="${table}" data-id="${escapeHtml(id)}" aria-label="Ubah data">↗</button><button class="row-action delete" type="button" data-delete="${table}" data-id="${escapeHtml(id)}" aria-label="Hapus data">×</button></div>`; }
  function statusTag(value) {
    const statuses = { active: ['Aktif', ''], inactive: ['Tidak aktif', 'inactive'], on_leave: ['Cuti', 'pending'], draft: ['Draft', 'draft'], pending: ['Menunggu', 'pending'], paid: ['Dibayarkan', 'paid'] };
    const [label, type] = statuses[value] || [value || '—', 'draft'];
    return `<span class="table-tag ${type}">${escapeHtml(label)}</span>`;
  }

  function renderDashboard() {
    renderCompanyIdentity();
    const { employees, departments, positions, payrolls } = state.records;
    const month = localDateString(new Date()).slice(0, 7);
    $('#stat-employees').textContent = employees.filter((employee) => employee.employment_status !== 'inactive').length;
    $('#stat-departments').textContent = departments.length;
    $('#stat-positions').textContent = positions.length;
    const monthPayrolls = payrolls.filter((item) => String(item.period_start || '').startsWith(month));
    $('#stat-payrolls').textContent = monthPayrolls.length;
    $('#hero-payroll-total').textContent = money(monthPayrolls.reduce((sum, item) => sum + Number(item.net_salary || 0), 0));
    $('#hero-payroll-caption').textContent = monthPayrolls.length ? `${monthPayrolls.length} catatan pada periode ini` : 'Belum ada catatan periode ini';
    $('#employee-nav-count').textContent = employees.length;
    renderDashboardAnalytics(employees, departments, payrolls);
    const latest = [...payrolls].sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))).slice(0, 3);
    $('#recent-payrolls').innerHTML = latest.length ? latest.map((item) => {
      const employee = item.employees || employees.find((person) => person.id === item.employee_id) || {};
      return `<div class="recent-item"><span class="recent-avatar">${escapeHtml(initials(employee.full_name))}</span><span class="recent-meta"><strong>${escapeHtml(employee.full_name || 'Karyawan')}</strong><small>${escapeHtml(employee.company_name || DEFAULT_COMPANY_NAME)} · ${escapeHtml(date(item.period_start))} — ${escapeHtml(date(item.period_end))}</small></span><span class="recent-amount">${escapeHtml(money(item.net_salary))}</span></div>`;
    }).join('') : `<div class="empty-state"><span class="empty-icon">◌</span>Belum ada data penggajian.</div>`;
  }

  function monthSeries(count) {
    const now = new Date();
    return Array.from({ length: count }, (_, index) => {
      const current = new Date(now.getFullYear(), now.getMonth() - count + index + 1, 1);
      return {
        key: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
        label: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(current)
      };
    });
  }

  function compactMoney(value) {
    const amount = Number(value) || 0;
    if (amount >= 1000000000) return `Rp${(amount / 1000000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`;
    if (amount >= 1000000) return `Rp${(amount / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`;
    if (amount >= 1000) return `Rp${Math.round(amount / 1000).toLocaleString('id-ID')} rb`;
    return money(amount);
  }

  function renderDashboardAnalytics(employees, departments, payrolls) {
    const months = monthSeries(6);
    const payrollByMonth = months.map((month) => payrolls
      .filter((item) => String(item.period_start || '').startsWith(month.key))
      .reduce((sum, item) => sum + Number(item.net_salary || 0), 0));
    const sixMonthTotal = payrollByMonth.reduce((sum, amount) => sum + amount, 0);
    $('#payroll-trend-total').textContent = money(sixMonthTotal);

    const current = payrollByMonth[payrollByMonth.length - 1] || 0;
    const previous = payrollByMonth[payrollByMonth.length - 2] || 0;
    const change = previous > 0 ? ((current - previous) / previous) * 100 : null;
    const trend = $('#payroll-trend-change');
    trend.className = `trend-badge ${change === null ? 'neutral' : change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'}`;
    trend.textContent = change === null
      ? current > 0 ? 'Ada payroll baru' : 'Belum ada data bulan ini'
      : `${change > 0 ? '↑' : change < 0 ? '↓' : '→'} ${Math.abs(change).toLocaleString('id-ID', { maximumFractionDigits: 1 })}% vs bulan lalu`;

    const chartWidth = 560;
    const chartHeight = 190;
    const chartLeft = 72;
    const chartRight = 548;
    const chartTop = 16;
    const chartBottom = 151;
    const largestPayroll = Math.max(0, ...payrollByMonth);
    const chartMax = largestPayroll ? largestPayroll * 1.12 : 0;
    const points = payrollByMonth.map((amount, index) => ({
      x: chartLeft + (chartRight - chartLeft) * (index + .5) / months.length,
      y: chartMax ? chartBottom - (amount / chartMax) * (chartBottom - chartTop) : chartBottom,
      amount
    }));
    const grid = [0, 1, 2, 3].map((index) => {
      const y = chartTop + (chartBottom - chartTop) * index / 3;
      const label = compactMoney(chartMax * (1 - index / 3));
      return `<line class="chart-grid-line" x1="${chartLeft}" y1="${y}" x2="${chartRight}" y2="${y}"></line><text class="chart-axis-label" x="${chartLeft - 8}" y="${y + 4}" text-anchor="end">${escapeHtml(label)}</text>`;
    }).join('');
    const line = points.map((point) => `${point.x},${point.y}`).join(' ');
    const area = `${points[0].x},${chartBottom} ${line} ${points[points.length - 1].x},${chartBottom}`;
    const monthLabels = months.map((month, index) => `<text class="chart-month-label" x="${points[index].x}" y="${chartBottom + 23}" text-anchor="middle">${escapeHtml(month.label)}</text>`).join('');
    const markers = points.map((point, index) => `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="4"><title>${escapeHtml(months[index].label)}: ${escapeHtml(money(point.amount))}</title></circle>`).join('');
    $('#payroll-trend-chart').innerHTML = `<svg class="payroll-chart" viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="Grafik tren gaji bersih enam bulan terakhir">
      <defs><linearGradient id="payroll-chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#8b6275" stop-opacity=".22"></stop><stop offset="100%" stop-color="#8b6275" stop-opacity=".015"></stop></linearGradient></defs>
      ${grid}<polygon class="chart-area" points="${area}"></polygon><polyline class="chart-line" points="${line}"></polyline>${markers}${monthLabels}
    </svg>${sixMonthTotal ? '' : '<span class="chart-empty-overlay">Belum ada data payroll 6 bulan terakhir</span>'}`;

    const activeEmployees = employees.filter((employee) => employee.employment_status === 'active');
    const counts = departments.map((department) => ({
      name: department.name,
      count: activeEmployees.filter((employee) => employee.department_id === department.id).length
    })).sort((a, b) => b.count - a.count);
    const unassigned = activeEmployees.filter((employee) => !departments.some((department) => department.id === employee.department_id)).length;
    if (unassigned) counts.push({ name: 'Belum ditentukan', count: unassigned });
    const topDepartments = counts.slice(0, 5);
    if (counts.length > 5) topDepartments.push({ name: 'Departemen lainnya', count: counts.slice(5).reduce((sum, item) => sum + item.count, 0) });
    const maxEmployees = Math.max(1, ...topDepartments.map((item) => item.count));
    $('#workforce-trend').innerHTML = `<strong>${activeEmployees.length}</strong><span>karyawan aktif</span><span class="workforce-share">${employees.length ? `${Math.round(activeEmployees.length / employees.length * 100)}% dari total` : 'Belum ada data karyawan'}</span>`;
    $('#workforce-chart').innerHTML = topDepartments.length ? topDepartments.map((item, index) => {
      const width = item.count ? Math.max(5, item.count / maxEmployees * 100) : 0;
      return `<div class="workforce-row"><div class="workforce-row-label"><span>${escapeHtml(item.name)}</span><strong>${item.count}</strong></div><div class="workforce-track"><span class="workforce-bar workforce-color-${index % 5}" style="width:${width}%"></span></div></div>`;
    }).join('') : '<div class="analytics-empty">Tambahkan departemen dan karyawan untuk melihat komposisi tim.</div>';
  }

  function renderEmployees() {
    const all = state.records.employees;
    const companyCount = new Set(all.map((item) => item.company_name).filter(Boolean)).size;
    $('#employees-summary').innerHTML = `<strong>${all.length}</strong> karyawan terdaftar <span class="summary-dot"></span> <strong>${companyCount}</strong> perusahaan <span class="summary-dot"></span> <strong>${all.filter((item) => item.employment_status === 'active').length}</strong> karyawan aktif`;
    const rows = searchable(all, 'employees', (item) => `${item.full_name} ${item.employee_code} ${item.company_name} ${item.email} ${item.departments?.name} ${item.positions?.title}`);
    setTableBody('employees', rows.length ? rows.map((item) => `<tr><td><div class="person-cell"><span class="person-avatar">${escapeHtml(initials(item.full_name))}</span><span class="person-meta"><strong>${escapeHtml(item.full_name)}</strong><small>${escapeHtml(item.employee_code)} · ${escapeHtml(item.email || 'Email belum diisi')}</small></span></div></td><td><span class="company-cell">${escapeHtml(item.company_name || DEFAULT_COMPANY_NAME)}</span></td><td>${escapeHtml(item.departments?.name || '—')}</td><td>${escapeHtml(item.positions?.title || '—')}</td><td>${escapeHtml(date(item.join_date))}</td><td>${statusTag(item.employment_status || 'active')}</td><td class="amount-cell">${escapeHtml(money(item.base_salary ?? item.positions?.base_salary))}</td><td>${actions('employees', item.id)}</td></tr>`).join('') : emptyRow(8, all.length ? 'Tidak ada karyawan yang cocok dengan pencarian.' : 'Belum ada data karyawan. Tambahkan karyawan pertama Anda.'));
  }

  function renderDepartments() {
    const all = state.records.departments;
    $('#departments-summary').innerHTML = `<strong>${all.length}</strong> departemen terdaftar <span class="summary-dot"></span> Struktur organisasi perusahaan`;
    const rows = searchable(all, 'departments', (item) => `${item.name} ${item.code} ${item.manager_name} ${item.location}`);
    const usedImages = new Set();
    $('#departments-grid').innerHTML = rows.length ? rows.map((item) => {
      const image = departmentImage(item.name, usedImages, all.indexOf(item));
      const employeeCount = Number(item.employees?.[0]?.count || 0);
      return `<article class="department-card">
        <div class="department-card-cover">
          <img src="${image}" alt="Foto kantor untuk ${escapeHtml(item.name)}" loading="eager" decoding="async">
          <span class="department-card-code">${escapeHtml(item.code || 'DEPARTEMEN')}</span>
          <div class="department-card-actions"><button class="row-action" type="button" data-edit="departments" data-id="${escapeHtml(item.id)}" aria-label="Ubah ${escapeHtml(item.name)}" title="Ubah departemen">↗</button><button class="row-action delete" type="button" data-delete="departments" data-id="${escapeHtml(item.id)}" aria-label="Hapus ${escapeHtml(item.name)}" title="Hapus departemen">×</button></div>
        </div>
        <div class="department-card-content">
          <h2>${escapeHtml(item.name)}</h2>
          <p class="department-card-description">${escapeHtml(item.description || 'Unit organisasi perusahaan.')}</p>
          <div class="department-card-meta"><span>${escapeHtml(item.manager_name || 'Kepala belum diisi')}</span><span>${escapeHtml(item.location || 'Lokasi belum diisi')}</span></div>
          <div class="department-card-footer"><span>${employeeCount} karyawan</span><span class="department-card-link" aria-hidden="true">Unit organisasi <b>→</b></span></div>
        </div>
      </article>`;
    }).join('') : `<div class="department-empty"><span class="empty-icon">◌</span>${all.length ? 'Tidak ada departemen yang cocok dengan pencarian.' : 'Belum ada data departemen.'}</div>`;
  }

  function departmentImage(name, usedImages, index) {
    const department = String(name || '').toLocaleLowerCase('id');
    let preferred = './assets/master-departments.jpg';
    if (/sdm|hr\b|human resource|personalia|rekrut|talent|karyawan/.test(department)) preferred = './assets/master-employees.jpg';
    else if (/keuangan|finance|akunt|account|payroll|pajak|tax|gaji/.test(department)) preferred = './assets/department-finance.jpg';
    else if (/penjualan|sales|pemasaran|marketing|layanan|customer|bisnis|business/.test(department)) preferred = './assets/department-people.jpg';
    else if (/jabatan|posisi|position|direksi|manajemen|management|pimpinan/.test(department)) preferred = './assets/master-positions.jpg';
    else if (/it\b|teknologi|technology|digital|sistem|data/.test(department)) preferred = './assets/department-workspace.jpg';
    else if (/operasional|operasi|produksi|logistik|umum|administrasi/.test(department)) preferred = './assets/department-office.jpg';

    const availableImage = [preferred, './assets/department-office.jpg', './assets/department-people.jpg', './assets/department-meeting.jpg', './assets/department-finance.jpg', './assets/department-workspace.jpg', './assets/master-employees.jpg', './assets/master-payroll.jpg', './assets/payroll-team.jpg', './assets/master-departments.jpg', './assets/master-positions.jpg']
      .find((image) => !usedImages.has(image));
    if (availableImage) {
      usedImages.add(availableImage);
      return availableImage;
    }
    return `./assets/${['department-office.jpg', 'department-people.jpg', 'department-meeting.jpg', 'department-finance.jpg', 'department-workspace.jpg'][index % 5]}`;
  }

  function renderPositions() {
    const all = state.records.positions;
    $('#positions-summary').innerHTML = `<strong>${all.length}</strong> jabatan terdaftar <span class="summary-dot"></span> Standar kompensasi per posisi`;
    const rows = searchable(all, 'positions', (item) => `${item.title} ${item.grade} ${item.description}`);
    setTableBody('positions', rows.length ? rows.map((item) => `<tr><td><div class="person-cell"><span class="person-avatar">⌂</span><span class="person-meta"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description || 'Posisi perusahaan')}</small></span></div></td><td>${escapeHtml(item.grade || '—')}</td><td class="amount-cell">${escapeHtml(money(item.base_salary))}</td><td>${escapeHtml(money(item.allowance))}</td><td>${Number(item.employees?.[0]?.count || 0)} karyawan</td><td>${actions('positions', item.id)}</td></tr>`).join('') : emptyRow(6, all.length ? 'Tidak ada jabatan yang cocok dengan pencarian.' : 'Belum ada data jabatan.'));
  }

  function renderPayrolls() {
    const all = state.records.payrolls;
    const total = all.reduce((sum, item) => sum + Number(item.net_salary || 0), 0);
    $('#payrolls-summary').innerHTML = `<strong>${all.length}</strong> catatan penggajian <span class="summary-dot"></span> Total tercatat <strong>${escapeHtml(money(total))}</strong>`;
    const rows = searchable(all, 'payrolls', (item) => `${item.employees?.full_name} ${item.employees?.employee_code} ${item.employees?.company_name} ${item.period_start} ${item.period_end}`);
    setTableBody('payrolls', rows.length ? rows.map((item) => `<tr><td><div class="person-cell"><span class="person-avatar">${escapeHtml(initials(item.employees?.full_name))}</span><span class="person-meta"><strong>${escapeHtml(item.employees?.full_name || 'Karyawan')}</strong><small>${escapeHtml(item.employees?.employee_code || '')} · ${escapeHtml(item.employees?.company_name || DEFAULT_COMPANY_NAME)}</small></span></div></td><td>${escapeHtml(date(item.period_start))} – ${escapeHtml(date(item.period_end))}</td><td class="amount-cell">${escapeHtml(money(item.basic_salary))}</td><td>${escapeHtml(money(item.allowance))}</td><td>${escapeHtml(money(item.deductions))}</td><td class="amount-cell">${escapeHtml(money(item.net_salary))}</td><td>${statusTag(item.status)}</td><td>${actions('payrolls', item.id)}</td></tr>`).join('') : emptyRow(8, all.length ? 'Tidak ada catatan penggajian yang cocok.' : 'Belum ada data penggajian.'));
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-page], [data-go], [data-create], [data-edit], [data-delete], [data-print], [data-refresh]');
      if (!target) return;
      if (target.dataset.page || target.dataset.go) { event.preventDefault(); goTo(target.dataset.page || target.dataset.go); }
      if (target.dataset.create) createRecord(target.dataset.create);
      if (target.dataset.edit) editRecord(target.dataset.edit, target.dataset.id);
      if (target.dataset.delete) deleteRecord(target.dataset.delete, target.dataset.id);
      if (target.dataset.print) printPayslip(target.dataset.print);
      if (target.hasAttribute('data-refresh')) loadData().then(() => notify('Data berhasil diperbarui.')).catch((error) => notify(error.message, 'error'));
    });
    $$('[data-search]').forEach((input) => input.addEventListener('input', () => { state.search[input.dataset.search] = input.value; render(); const active = $(`[data-search="${state.page}"]`); if (active) { active.focus(); active.setSelectionRange(active.value.length, active.value.length); } }));
    $('#settings-button').addEventListener('click', showSetup);
    $('#dashboard-payroll-action').addEventListener('click', () => createRecord('payrolls'));
    $('#mobile-menu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    $('#modal-backdrop').addEventListener('click', (event) => { if (event.target.id === 'modal-backdrop') closeModal(); });
    $('.modal-close').addEventListener('click', closeModal);
    $('#cancel-modal').addEventListener('click', closeModal);
    $('#record-form').addEventListener('submit', saveForm);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && $('#modal-backdrop').classList.contains('open')) closeModal(); });
    window.addEventListener('hashchange', () => goTo(location.hash.slice(1) || 'dashboard'));
  }

  async function start() {
    $('#today-label').textContent = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    $('#current-year').textContent = new Date().getFullYear();
    bindEvents();
    goTo(TITLES[location.hash.slice(1)] ? location.hash.slice(1) : 'dashboard');
    if (!state.config.url || !state.config.key || !state.config.company_name) {
      showSetup();
      return;
    }
    try { await loadData(); }
    catch (error) { notify(error.message, 'error'); }
  }

  start();
})();
