use criterion::{criterion_group, criterion_main, Criterion};

fn fetch_benchmark(c: &mut Criterion) {
    // 0:  48 c7 c0 01 00 00 00    mov    rax,0x1
    let mut emu = lancelot::test::emu_from_shellcode64(&b"\x48\xC7\xC0\x01\x00\x00\x00"[..]);
    emu.reg.rip = 0x0;

    c.bench_function("fetch", |b| {
        b.iter(|| {
            emu.fetch().unwrap();
        })
    });
}

fn insn_benchmark(c: &mut Criterion) {
    // 0:  48 c7 c0 01 00 00 00    mov    rax,0x1
    let mut emu = lancelot::test::emu_from_shellcode64(&b"\x48\xC7\xC0\x01\x00\x00\x00"[..]);

    c.bench_function("mov rax, 0x1", |b| {
        b.iter(|| {
            emu.reg.rip = 0x0;
            emu.step().unwrap();
        })
    });
}

criterion_group!(fetch, fetch_benchmark);
criterion_group!(insn, insn_benchmark);
criterion_main!(fetch, insn);